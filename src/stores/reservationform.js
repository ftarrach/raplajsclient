import Reservation from '@/types/Reservation'
import Repeating from '@/types/Repeating'

const reservationform = {
  namespaced: true,

  state: {
    type: {
      attributes: []
    },
    classifications: [],
    allocatables: [],
    appointments: [],
    permissions: [],
    new: false,
    gwtReservation: null
  },

  getters: {
    isNew: state => state.new,
    hasType: state => state.type && Boolean(state.type.id),
    appointment: state => id => state.appointments.find(a => a.id === id)
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
    },
    updateRepeatingValue(state, payload) {
      state.appointments.find(a => a.id === payload.id).repeating[payload.prop] = payload.value
    },
    /** payload: {id: appointmentId, value: repeatType } */
    setRepeatType(state, payload) {
      let appointment = state.appointments.find(a => a.id === payload.id)
      if (payload.value === null) {
        appointment.repeating = null
      } else {
        if (!appointment.repeating) {
          appointment.repeating = Repeating.create(appointment)
        }
        appointment.repeating.type = payload.value
      }
    },
    markAsNew(state) { state.new = true },
    markAsEdit(state) { state.new = false },
    setGwt(state, reservation) { state.gwtReservation = Object.freeze(reservation) },

    delete(state) {
      // TODO: after dialogs are implemented, remove message and uncomment code. Pass PopupContext instead of null
      console.error('delete reservation code is implemented, but won\'t work until dialogs are implemented')
      // api.getReservationController().deleteReservations(
      //   api.asSet([state.gwtReservation]), null
      // ).thenRun(() => console.log('hi'))
      //  .exceptionally(console.error)
    },

    addAppointment(state, payload) {
      state.appointments.push(payload)
    }
  },

  actions: {
    newReservation({commit}) {
      commit('reset')
      commit('markAsNew')
    },

    editReservation({commit}, reservation) {
      commit('setType', reservation.type)
      commit('setClassifications', reservation.classifications)
      commit('setAppointments', reservation.appointments)
    },

    create({commit, dispatch}, typeId) {
      let newReservation =
        api.getFacade().newReservation(
          api.getFacade().getDynamicTypes('reservation').find(r => r.getId() === typeId).newClassification(),
          api.getCalendarModel().getUser()
        )
      commit('setGwt', newReservation)
      dispatch('editReservation', Reservation.fromGwt(newReservation))
    },

    save({commit}) {
      alert('reservationform/save is not yet implemented')
    },

    delete({commit}) {
      commit('delete')
    },

    addAppointment({commit, getters, state}, existingAppointmentId) {
      if (existingAppointmentId) {
        alert('ASK')
        // REVIEW: if newAppointmentAsync is called, an Appointment without a reference to the reservation is created
        // let appointment = getters['appointment'](existingAppointmentId)
        // api.getFacade().newAppointmentAsync(
        //   api.createInterval(
        //     DateTime.toGwtDate(appointment.start),
        //     DateTime.toGwtDate(appointment.end)
        //   ))
        //   .thenAccept(a => {
        //     a.setParent(state.gwtReservation)
        //     console.log(a.getReservation())
        //     // commit('addAppointment', Appointment.fromGwt(a))
        //   })
        //   .exceptionally(console.error)
      } else {
        // create with default
      }
    }
  }
}

const defaultState = JSON.stringify(reservationform.state)

export default reservationform
