/* global api */
import Allocatable from '@/types/Allocatable'
import DynamicType from '@/types/DynamicType'
import Category from '@/types/Category'

let reduceToIdDictionary = function(target, obj) {
  target[obj.id] = obj
  return target
}

const gwtStore = {
  resourcetypes: []
}

Category.prototype.findRecursive = function(needleId, id, children) {
  if (id(this) === needleId) {
    return this
  } else {
    let childs = children(this)
    if (childs && childs.length > 0) {
      for (let c of childs) {
        let res = c.findRecursive(needleId, id, children)
        if (res) {
          return res
        }
      }
    }
  }
  return false
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
    resourcetypes: {}, // { id: DynamicType },
    supercategory: {} // { id: Category }
  },

  getters: {
    allocatable: state => id => state.allocatables[id],
    firstReservationType: state => state.reservationtypes[Object.keys(state.reservationtypes)[0]],
    resourcetype: state => id => state.resourcetypes[id],
    allResourcetypes: state => Object.values(state.resourcetypes),
    allocatablesForType: () => id => {
      let gwtType = gwtStore.resourcetypes.find(r => r.getId() === id)
      if (!gwtType) {
        return []
      }
      return api.getFacade().getAllocatablesWithFilter([gwtType.newClassificationFilter()]).map(a => Allocatable.fromGwt(a))
    },
    category: state => id => state.supercategory.findRecursive(id, c => c.id, c => c.subcategories)
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
    },

    setCategories(state, supercategory) {
      state.supercategory = supercategory
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

      commit('setCategories', Category.fromGwt(api.getFacade().getSuperCategory()))

      console.log('refreshed facade data')
    }
  }
}

export default facade
