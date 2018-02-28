/* global api */
import Allocatable from '@/types/Allocatable'

const facade = {
  namespaced: true,

  state: {
    allocatables: {}
  },

  getters: {
    allocatable: state => id => state.allocatables[id]
  },

  mutations: {
    setAllocatables(state, allocatables) {
      state.allocatables = allocatables
    }
  },

  actions: {
    initialize({commit}) {
      console.log('initializing facade')
      let allocatables = api.getFacade().getAllocatables().reduce((acc, a) => { acc[a.getId()] = Allocatable.fromGwt(a); return acc }, {})
      commit('setAllocatables', allocatables)
    }
  }
}

export default facade
