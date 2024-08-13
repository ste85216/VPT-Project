/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import '@fortawesome/fontawesome-free/css/all.css'

// Composables
import { createVuetify } from 'vuetify'

import { aliases, fa } from 'vuetify/iconsets/fa'
import { zhHant } from 'vuetify/locale'
import colors from 'vuetify/util/colors'

import { VDateInput } from 'vuetify/labs/VDateInput'

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
  },
  components: {
    VDateInput
  }
})
