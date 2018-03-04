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
    },
    setClassifications(state, classifications) {
      state.classifications = classifications
    },
    /** payload: {key, value} */
    updateClassificationValue(state, payload) {
      // TODO: send a change to the reservation controller
      state.classifications.data[payload.key] = payload.value
    }
  },

  actions: {
    newReservation({commit}, type) {
      commit('reset')
      commit('setType', type)
    },

    editReservation({commit}, reservation) {
      commit('setType', reservation.type)
      commit('setClassifications', reservation.classifications)
    }
  }

}

const defaultState = JSON.stringify(reservationform.state)

export default reservationform
