/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import Vue3Spline from 'vue3-spline'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)

app.use(Vue3Spline)
app.use(VueSweetalert2)

// Register other plugins
registerPlugins(app)

// Mount the app
app.mount('#app')
