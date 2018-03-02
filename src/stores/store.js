import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import calendar from './calendar'
import locale from './locale'
import facade from './facade'
import reservationform from './reservationform'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    common,
    calendar,
    locale,
    facade,
    reservationform
  }
})
