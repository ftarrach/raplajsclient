// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import moment from 'moment'

import Vue from 'vue'
import App from './App'
import router from './routes'
import store from './stores/store'
// import 'font-awesome/css/font-awesome.css'
import 'cool-checkboxes-for-bulma.io/dist/css/bulma-radio-checkbox.min.css'
import LayoutHelper from './globalComponents'
import RaplaGwtPlugin from './plugins/RaplaGwtPlugin'

moment.locale('de')

Vue.config.productionTip = false

Vue.use(LayoutHelper)
Vue.use(RaplaGwtPlugin, {
  onLoad: startVue,
  standaloneMode: process.env.NODE_ENV === 'development'
})

// moment.locale(window.navigator.userLanguage || window.navigator.language)

/* eslint-disable no-new */
function startVue() {
  console.log('starting vue')
  window.raplaVue = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })
}
