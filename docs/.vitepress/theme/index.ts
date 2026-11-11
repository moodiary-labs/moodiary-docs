// https://vitepress.dev/guide/custom-theme
//
// The default theme, re-skinned with Moodiary's monochrome palette.
// `generated/monochrome.css` overrides the default theme CSS variables and is
// regenerated from Material Color Utilities by `npm run theme:gen`.
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './generated/monochrome.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
} satisfies Theme
