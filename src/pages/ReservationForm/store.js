
const reservationform = {
  namespaced: true,

  state: {
    type: {
      attributes: []
    },
    classification: {},
    allocatables: [],
    appointments: [],
    permissions: [],
    gwt: null
  },

  getters: {

  },

  mutations: {
    initialize(state, {reservation, gwt}) {
      this.gwt = gwt
      // state.type = reservation.type
      // state.classifications = reservation.classifications
      // state.appointments = reservation.appointments
    }
  },

  actions: {

  }
}

export default reservationform
