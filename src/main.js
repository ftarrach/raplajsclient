import moment from 'moment'

import Vue from 'vue'
import App from './App'
import router from './routes'
import store from './stores/store'
import LayoutHelper from './globalComponents'
import RaplaGwtPlugin from './plugins/RaplaGwtPlugin'
import Rx from 'rxjs'

import 'cool-checkboxes-for-bulma.io/dist/css/bulma-radio-checkbox.min.css'

window.Rx = Rx

moment.locale('de')

Vue.config.productionTip = false

Vue.use(LayoutHelper)
Vue.use(RaplaGwtPlugin, {
  onLoad: startVue,
  standaloneMode: false
})

function startVue() {
  window.raplaVue = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })
}
