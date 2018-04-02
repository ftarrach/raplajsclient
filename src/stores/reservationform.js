import Appointment from '@/types/Appointment'
import Reservation from '@/types/Reservation'
import DateTime, { tomorrow } from '@/types/util/DateTime'

let gwtReservation = null

const reservationform = {
  namespaced: true,

  state: {
    persistent: {}, // state of the reservation in the Beginning of editing it

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
    appointment: state => id => state.appointments.find(a => a.id === id),
    persistent: state => state.persistent
  },

  mutations: {
    reset(state, type) {
      Object.assign(state, JSON.parse(defaultState))
    },
    setPersistent(state, per) {
      state.persistent = per
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
        // TODO: gwtAppointment.setRepeatingEnabled(false)
      } else {
        if (!appointment.repeating) {
          // TODO: gwtAppointment.setRepeatingEnabled(true)
          // appointment.repeating = gwtAppointment.getRepeating()
        }
        appointment.repeating.type = payload.value
      }
    },
    markAsNew(state) { state.new = true },
    markAsEdit(state) { state.new = false },

    delete(state) {
      // TODO: after dialogs are implemented, remove message and uncomment code. Pass PopupContext instead of null
      api.getReservationController().deleteReservations(
        api.asSet([state.gwtReservation]), null
      ).thenRun(() => console.log('hi'))
        .exceptionally(openErrorDialog)
    },

    addAppointment(state, payload) {
      state.appointments.push(payload)
    },

    /** payload: {id: appointmentid, value: new endtimetype} */
    setEndtimeType(state, payload) {
      let appointment = state.appointments.find(a => a.id === payload.id)
      // TODO: send to gwt
      switch (payload.value) {
        case 'same-day':
          appointment.end.years = appointment.repeating.start.years
          appointment.end.months = appointment.repeating.start.months
          appointment.end.date = appointment.repeating.start.date
          break
        case 'next-day':
        case 'x-day':
          const { nYear, nMonth, nDate } = tomorrow(appointment.start)
          appointment.end.years = nYear
          appointment.end.months = nMonth
          appointment.end.date = nDate
          break
        default:
          console.error(`unknown endtimetype: ${payload}`)
      }
    }
  },

  actions: {
    newReservation({commit}) {
      commit('reset')
      commit('markAsNew')
    },

    editReservation({commit}, reservation) {
      new Promise((resolve, reject) => {
        api.getCalendarModel().queryReservations(api.getCalendarModel().getTimeIntervall())
          .thenAccept(b => {
            gwtReservation = api.getFacade().edit(
              api.toArray(b).find(r => r.getId() === reservation.id)
            )
            commit('setPersistent', JSON.parse(JSON.stringify(reservation)))
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
          // console.log(dialog)
          // alert('hi')
          // raplaVue.$emit('gwt-dialog-close')
          // raplaVue.$router.go(-1)
        })
        .exceptionally(console.warn)
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
        .exceptionally(openErrorDialog)
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
        .exceptionally(openErrorDialog)
    }
  }
}

const defaultState = JSON.stringify(reservationform.state)

export default reservationform
