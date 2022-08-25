// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { mdi } from 'vuetify/iconsets/mdi-svg'


// Vuetify
import { createVuetify } from 'vuetify'
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
    }
  }
})
