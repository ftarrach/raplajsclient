const reservationform = {
  namespaced: true,

  state: {
    type: {
      attributes: []
    },
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
    setAppointments(state, appointments) {
      state.appointments = appointments
    },
    /** payload: {key, value} */
    updateClassificationValue(state, payload) {
      // TODO: send a change to the reservation controller
      state.classifications.data[payload.key] = payload.value
    },
    /** payload: {id: appointmentId, prop: nameOfChangedProperty, value: newValue} */
    updateAppointmentValue(state, payload) {
      state.appointments.find(a => a.id === payload.id)[payload.prop] = payload.value
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
      commit('setAppointments', reservation.appointments)
    }
  }

}

const defaultState = JSON.stringify(reservationform.state)

export default reservationform
