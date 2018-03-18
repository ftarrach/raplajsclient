/* global api */

import moment from 'moment'
import DateTime from '@/types/util/DateTime'
import User from '@/types/User'
import AppointmentBlock from '@/types/AppointmentBlock'
import Reservation from '@/types/Reservation'

const calendar = {
  namespaced: true,

  state: {
    startDate: DateTime.fromMoment(moment('1970-01-01')),
    endDate: DateTime.fromMoment(moment('1970-01-01')),
    user: new User(),
    reservations: []
  },

  getters: {
    username: state => state.user.username,
    reservation: state => id => state.reservations.find(r => r.id === id)
  },

  mutations: {
    refreshCalendar(state) {
      let model = api.getCalendarModel()
      state.user = User.fromGwt(model.getUser())
      state.startDate = DateTime.fromGwtDate(model.getStartDate())
      state.endDate = DateTime.fromGwtDate(model.getEndDate())
    },

    setAppointments(state, blocks) {
      state.appointmentBlocks = blocks
    },

    setReservations(state, reservations) {
      state.reservations = reservations
    },

    setStartDate(state, newStartDate) {
      state.startDate = newStartDate
    },

    setEndDate(state, newEndDate) {
      state.endDate = newEndDate
    }
  },

  actions: {

    refresh({commit}) {
      api.debug('refresh calendar model')
      api.getCalendarModel().refresh()
      commit('refreshCalendar')
    },

    loadCalendar({commit}, calendarKey) {
      api.debug(`load calendar ${calendarKey}`)
      api.getCalendarModel().load(calendarKey)
      commit('refreshCalendar')
    },

    /* WARNING: returns plain GWT Objects */
    loadAppointmentBlocks() {
      api.debug('load appointments')
      return new Promise((resolve, reject) => {
        api.getCalendarModel().queryBlocks(api.getCalendarModel().getTimeIntervall())
          .thenAccept(b => {
            let blocks = api.toArray(b)
            let parsed = blocks.map(b => AppointmentBlock.fromGwt(b))
            resolve(parsed)
          })
          .exceptionally(reject)
      })
    },

    loadReservations({commit}) {
      api.debug('load reservations')
      return new Promise((resolve, reject) => {
        api.getCalendarModel().queryReservations(api.getCalendarModel().getTimeIntervall())
          .thenAccept(result => {
            let array = api.toArray(result)
            commit('setReservations', array.map(r => Reservation.fromGwt(r)))
            resolve()
          }).exceptionally(error => {
            // TODO: show dialog box or something
            console.error(error)
          })
      })
    },

    setStartDate({commit, dispatch}, newStartDate) {
      api.getCalendarModel().setStartDate(DateTime.toGwtDate(newStartDate))
      commit('setStartDate', newStartDate)
      // TODO: only reload if needed
      dispatch('loadAppointments')
      dispatch('loadReservations')
    },

    setEndDate({commit, dispatch}, newEndDate) {
      let add1 = DateTime.fromMoment(DateTime.toMoment(newEndDate).add(1, 'day'))
      api.getCalendarModel().setEndDate(DateTime.toGwtDate(add1))
      commit('setEndDate', newEndDate)
      // TODO: only reload if needed
      dispatch('loadAppointments')
      dispatch('loadReservations')
    }
  }
}

export default calendar
