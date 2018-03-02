/* global api */

const common = {
  namespaced: true,

  state: {
    calendars: []
  },

  getters: {
    allCalendars: state => state.calendars
  },

  mutations: {
    setCalendars(state, payload) {
      state.calendars = payload
    }
  },

  actions: {
    loadCalendars({ commit }) {
      commit('setCalendars', api.getCalendarNames())
    }
  }
}

export default common
