import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'

const script = readFileSync(new URL('../docs/.vitepress/locale.js', import.meta.url), 'utf8')
function visit({
  path = '/',
  languages = ['zh-CN', 'en-US'],
  language = 'en-US',
  referrer = '',
  navigation = 'navigate',
  search = '',
  hash = '',
} = {}) {
  const redirects = []
  runInNewContext(script, {
    URL,
    document: { referrer },
    location: {
      pathname: path,
      origin: 'https://moodiary.net',
      search,
      hash,
      replace: (url) => redirects.push(url),
    },
    navigator: { languages, language },
    performance: { getEntriesByType: () => navigation ? [{ type: navigation }] : [] },
  })
  return redirects
}

test('home follows the first supported browser language, falling back to English', () => {
  for (const [languages, expected] of [
    [['zh-CN', 'en-US'], ['/zh/']],
    [['en-US', 'zh-CN'], []],
    [['ja-JP', 'zh-TW'], ['/zh/']],
    [['de-DE', 'en-GB', 'zh'], []],
    [['ja-JP'], []],
    [[], []],
  ]) {
    assert.deepEqual(visit({ languages }), expected)
  }
  assert.deepEqual(visit({ languages: null, language: 'en-US' }), [])
  assert.deepEqual(visit({ languages: [], language: 'zh-CN' }), ['/zh/'])
})

test('articles and explicit Chinese home never redirect', () => {
  for (const path of ['/zh/', '/zh/index.html', '/guide/install.html', '/zh/guide/install.html', '/missing']) {
    assert.deepEqual(visit({ path }), [])
  }
})

test('reload, history traversal and same-site full navigation retain English', () => {
  for (const navigation of ['reload', 'back_forward']) {
    assert.deepEqual(visit({ navigation }), [])
  }
  assert.deepEqual(visit({ referrer: 'https://moodiary.net/guide/' }), [])
  assert.deepEqual(visit({ referrer: 'https://example.com/' }), ['/zh/'])
})

test('redirect preserves query and hash and supports index.html', () => {
  assert.deepEqual(visit({ path: '/index.html', search: '?from=app', hash: '#intro' }),
    ['/zh/?from=app#intro'])
})
