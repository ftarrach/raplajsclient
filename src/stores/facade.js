/* global api */
import Allocatable from '@/types/Allocatable'
import DynamicType from '@/types/DynamicType'

let reduceToIdDictionary = function(target, obj) {
  target[obj.id] = obj
  return target
}

/*
 * This store abstracts the rapla facade interface, which provides
 * calendar-independent Rapla objects like Allocatables (persons, rooms, …),
 * DynamicTypes (reservation types, …), Users and Categories
*/
const facade = {
  namespaced: true,

  state: {
    allocatables: {}, // { id: Allocatable }
    reservationtypes: {} // { id: DynamicType }
  },

  getters: {
    allocatable: state => id => state.allocatables[id],
    firstReservationType: state => state.reservationtypes[Object.keys(state.reservationtypes)[0]]
  },

  mutations: {
    setAllocatables(state, allocatables) {
      state.allocatables = allocatables
    },

    setReservationTypes(state, reservationtypes) {
      state.reservationtypes = reservationtypes
    }
  },

  actions: {
    initialize({dispatch}) {
      dispatch('refresh')
    },

    refresh({commit}) {
      console.log('refreshing facade data')
      commit('setReservationTypes',
        api.getFacade().getDynamicTypes('reservation').reduce((acc, a) => reduceToIdDictionary(acc, DynamicType.fromGwt(a)), {}))
      commit('setAllocatables',
        api.getFacade().getAllocatables().reduce((acc, a) => reduceToIdDictionary(acc, Allocatable.fromGwt(a)), {}))
      console.log('finished refreshing')
    }
  }
}

export default facade
