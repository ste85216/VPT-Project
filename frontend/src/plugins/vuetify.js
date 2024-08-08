/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

import { zhHant } from 'vuetify/locale'
import colors from 'vuetify/util/colors'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#039199', // #E53935
          secondary: colors.red.lighten4 // #FFCDD2
        }
      }
    }
  },
  locale: {
    locale: 'zhHant',
    fallback: 'en',
    messages: { zhHant }
  }
})
