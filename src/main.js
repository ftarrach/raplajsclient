/* eslint-disable */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import moment from 'moment'

import Vue from 'vue'
import App from './App'
import router from './routes'
import store from './stores/store'
import 'font-awesome/css/font-awesome.css'
// import 'bulma/css/bulma.css'
import 'cool-checkboxes-for-bulma.io/dist/css/bulma-radio-checkbox.min.css'
import LayoutHelper from './globalComponents'
// import Cookies from 'js-cookie';

moment.locale('de')

require('./gwtEvents.js')

// API Callback
var apiCallback = (api) => {
  console.log('got the api')
  window.api = api
}

// start GWT
window.rapla = {
  RaplaCallback : function() {
    this.gwtLoaded = (starter) => {
        var errorFunction = new rapla.Catch((info) => console.log(info))
        var registerAction = () => {
          var loginToken = starter.getValidToken()
          if (loginToken != null) {
            var accessToken = loginToken.getAccessToken()
            console.log('AccessToken ' + accessToken)
            starter.registerApi(accessToken).thenAccept(new rapla.Consumer(apiCallback))
          } else {
            window.location = '../rapla/login?url=' + window.location
          }
        }
      starter.initLocale('de_DE').thenRun(new rapla.Action(registerAction)).exceptionally(errorFunction)
    }
  }
}

Vue.config.productionTip = false

Vue.use(LayoutHelper)

// moment.locale(window.navigator.userLanguage || window.navigator.language)

/* eslint-disable no-new */
window.raplaVue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
