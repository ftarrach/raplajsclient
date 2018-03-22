import Appointment from '@/types/Appointment'
import Reservation from '@/types/Reservation'
import Repeating from '@/types/Repeating'
import DateTime from '@/types/util/DateTime'

let gwtReservation = null

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
    new: false
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
      gwtReservation.getClassification().setValue(payload.key, payload.value)
      state.classifications.data[payload.key] = payload.value
    },
    /** payload: {id: appointmentId, prop: nameOfChangedProperty, value: newValue} */
    updateAppointmentValue(state, payload) {
      // REVIEW: where are the setters in an appointment?
      // gwtReservation.getAppointments().find(a => a.getId() === payload.id)
      window.reservation = gwtReservation
      state.appointments.find(a => a.id === payload.id)[payload.prop] = payload.value
    },
    updateRepeatingValue(state, payload) {
      const repeating = gwtReservation.getAppointments().find(a => a.getId() === payload.id).getRepeating()
      switch (payload.prop) {
        case 'interval': repeating.setInterval(payload.value); break
        case 'start': repeating.setStart(payload.value); break
        case 'end': repeating.setEnd(payload.value); break
        case 'number': repeating.setNumber(payload.value); break
        case 'type': repeating.setType(payload.value); break
        default: api.warn(`no gwt-Setter found for prop ${payload.prop} in reservationform.updateRepeatingValue`)
      }
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
      new Promise((resolve, reject) => {
        api.getCalendarModel().queryBlocks(api.getCalendarModel().getTimeIntervall())
          .thenAccept(b => {
            gwtReservation = api.getFacade().edit(
              api.toArray(b).find(b => b.getAppointment().getReservation().getId() === reservation.id).getAppointment().getReservation()
            )
            commit('setType', reservation.type)
            commit('setClassifications', reservation.classifications)
            commit('setAppointments', reservation.appointments)
          })
          .exceptionally(reject)
      })
    },

    create({commit, dispatch}, typeId) {
      const newReservation =
        api.getFacade().newReservation(
          api.getFacade().getDynamicTypes('reservation').find(r => r.getId() === typeId).newClassification(),
          api.getCalendarModel().getUser()
        )
      gwtReservation = newReservation
      const reservation = Reservation.fromGwt(gwtReservation)
      commit('setType', reservation.type)
      commit('setClassifications', reservation.classifications)
      dispatch('addAppointment')
    },

    save({commit}) {
      api.getReservationController()
        .saveReservation(null, gwtReservation)
        .thenApply(dialog => {
          console.log(dialog)
          alert('hi')
        })
        .exceptionally(console.error)
    },

    delete({commit}) {
      commit('delete')
    },

    addAppointment({commit, getters}) {
      let start = DateTime.now()
      start.hours = 8
      start.minutes = 0
      start.seconds = 0
      let end = DateTime.now()
      end.hours = 9
      end.minutes = 30
      end.seconds = 0
      api.getFacade().newAppointmentAsync(
        api.createInterval(
          DateTime.toGwtDate(start),
          DateTime.toGwtDate(end)
        ))
        .thenAccept(a => {
          a.setParent(gwtReservation)
          gwtReservation.addAppointment(a)
          commit('addAppointment', Appointment.fromGwt(a))
        })
        .exceptionally(console.error)
    },

    cloneAppointment({commit, getters}, existingAppointmentId) {
      const appointment = getters['appointment'](existingAppointmentId)
      api.getFacade().newAppointmentAsync(
        api.createInterval(
          DateTime.toGwtDate(appointment.start),
          DateTime.toGwtDate(appointment.end)
        ))
        .thenAccept(a => {
          a.setParent(gwtReservation)
          gwtReservation.addAppointment(a)
          commit('addAppointment', Appointment.fromGwt(a))
        })
        .exceptionally(console.error)
    }
  }
}

const defaultState = JSON.stringify(reservationform.state)

export default reservationform
