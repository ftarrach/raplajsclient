const reservationform = {
  namespaced: true,

  state: {
    type: {},
    classifications: [],
    allocatables: [],
    appointments: [],
    permissions: []
  },

  getters: {
    hasType: state => state.type && Boolean(state.type.id)
  },

  mutations: {
    reset(state, type) {
      Object.assign(state, JSON.parse(defaultState))
    },
    setType(state, type) {
      state.type = type
    }
  },

  actions: {
    newReservation({commit}, type) {
      commit('reset')
      commit('setType', type)
    },

    editReservation({commit}, reservation) {
      commit('setType', reservation.type)
    }
  }

}

const defaultState = JSON.stringify(reservationform.state)

export default reservationform
