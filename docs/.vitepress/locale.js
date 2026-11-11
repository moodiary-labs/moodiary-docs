;(() => {
  const supported = (language) => {
    const code = language?.toLowerCase().split('-')[0]
    return code === 'zh' || code === 'en' ? code : undefined
  }

  if (location.pathname !== '/' && location.pathname !== '/index.html') return

  // Explicit pages, reloads, history traversal and internal navigation keep
  // their language. Run before rendering to avoid flashing the English home.
  const navigation = performance.getEntriesByType('navigation')[0]
  if (navigation && navigation.type !== 'navigate') return
  if (document.referrer && new URL(document.referrer).origin === location.origin) return

  const language = (navigator.languages?.length ? navigator.languages : [navigator.language])
    .map(supported)
    .find(Boolean)

  if (language === 'zh') {
    location.replace('/zh/' + location.search + location.hash)
  }
})()
