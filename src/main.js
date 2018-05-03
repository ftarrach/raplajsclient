// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import Vuetify from 'vuetify'
import Locale from './locale'
import './assets/vuetify-config.styl'
import 'mdi/css/materialdesignicons.min.css'
import Rx from 'rxjs'
import Reservation from '@/types/Reservation'

window.Rx = Rx

Vue.use(Vuex)
Vue.use(Vuetify, {
  theme: {
    primary: '#1867c0',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
Vue.config.productionTip = false

const STANDALONE = false

if (STANDALONE) {
  startVue()
} else {
  console.log('starting in gwt mode')
  window.rapla = {
    RaplaCallback: function() {
      this.gwtLoaded = (starter) => {
        let registerAction = () => {
          let loginToken = starter.getValidToken()
          if (loginToken != null) {
            let accessToken = loginToken.getAccessToken()
            let p = starter.registerApi(accessToken)
            p.thenAccept((_api) => {
              window.api = _api
              startVue()
              api.application.start(true, () => {})
            }).exceptionally(e => {
              console.error(e)
            })
          } else {
            window.location = '../rapla/login?url=' + window.location
          }
        }
        starter.initLocale('de_DE') // TODO: move this to locale store and save the current locale key as a state?
          .thenRun(registerAction)
          .exceptionally(console.warn)
      }
    }
  }
}

window.Reservation = Reservation

function startVue() {
  Locale.setup()
  const raplaVue = new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    store: new Vuex.Store({
      modules: {}
    }),

    // these Methods can be called from GWT and return a value
    methods: {
      hasWindow(options) { return this.$children[0].hasWindow(options) }
    }
  })
  window.openErrorDialog = e => raplaVue.$emit('open-error-dialog', e)
  window.raplaVue = raplaVue
}
