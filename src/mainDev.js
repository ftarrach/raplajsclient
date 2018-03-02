import moment from 'moment'

import Vue from 'vue'
import DevApp from './DevApp'
import 'cool-checkboxes-for-bulma.io/dist/css/bulma-radio-checkbox.min.css'
import LayoutHelper from './globalComponents'
import RaplaGwtPlugin from './plugins/RaplaGwtPlugin'

moment.locale('de')

Vue.config.productionTip = false

Vue.use(LayoutHelper)
Vue.use(RaplaGwtPlugin, {
  onLoad: startVue,
  standaloneMode: true
})

function startVue() {
  window.raplaVue = new Vue({
    el: '#app',
    template: '<DevApp/>',
    components: { DevApp }
  })
}
