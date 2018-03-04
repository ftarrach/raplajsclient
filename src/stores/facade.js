/* global api */
import Allocatable from '@/types/Allocatable'
import DynamicType from '@/types/DynamicType'

let reduceToIdDictionary = function(target, obj) {
  target[obj.id] = obj
  return target
}

const gwtStore = {
  resourcetypes: []
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
    reservationtypes: {}, // { id: DynamicType }
    resourcetypes: {} // { id: DynamicType }
  },

  getters: {
    allocatable: state => id => state.allocatables[id],
    firstReservationType: state => state.reservationtypes[Object.keys(state.reservationtypes)[0]],
    resourcetype: state => id => state.resourcetypes[id],
    allocatablesForType: state => id => {
      let gwtType = gwtStore.resourcetypes.find(r => r.getId() === id)
      if (!gwtType) {
        return []
      }
      return api.getFacade().getAllocatablesWithFilter([gwtType.newClassificationFilter()]).map(a => Allocatable.fromGwt(a))
    }
  },

  mutations: {
    setAllocatables(state, allocatables) {
      state.allocatables = allocatables
    },

    setReservationTypes(state, reservationtypes) {
      state.reservationtypes = reservationtypes
    },

    setResourceTypes(state, resourcetypes) {
      state.resourcetypes = resourcetypes
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

      gwtStore.resourcetypes = api.getFacade().getDynamicTypes('resource')
      gwtStore.resourcetypes.push(...api.getFacade().getDynamicTypes('person'))

      commit('setResourceTypes',
        gwtStore.resourcetypes.reduce((acc, a) => reduceToIdDictionary(acc, DynamicType.fromGwt(a)), {}))

      console.log('refreshed facade data')
    }
  }
}

export default facade
