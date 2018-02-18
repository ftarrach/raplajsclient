import Vue from 'vue'
import Vuex from 'vuex'
import facade from './facade/demofacade'
// import facade from './facade/gwtfacade'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    rapla: facade,
    user
  }
})
