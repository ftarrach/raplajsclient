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
    appointmentBlocks: [],
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
      console.log('refresh calendar model')
      api.getCalendarModel().refresh()
      commit('refreshCalendar')
    },

    loadCalendar({commit}, calendarKey) {
      console.log(`load calendar ${calendarKey}`)
      api.getCalendarModel().load(calendarKey)
      commit('refreshCalendar')
    },

    loadAppointments({commit}) {
      console.log('load appointments')
      new Promise((resolve, reject) => {
        api.getCalendarModel().queryBlocks(api.getCalendarModel().getTimeIntervall())
          .thenAccept(b => {
            let blocks = api.toArray(b)
            // TODO: parse blocks here in an async way, then commit the parsed blocks
            commit('setAppointments', blocks.map(b => AppointmentBlock.fromGwt(b)))
            resolve()
          })
          .exceptionally(console.warn)
      })
    },

    loadReservations({commit}) {
      console.log('load reservations')
      return new Promise((resolve, reject) => {
        api.getCalendarModel().queryReservations(api.getCalendarModel().getTimeIntervall())
          .thenAccept(result => {
            let array = api.toArray(result)
            commit('setReservations', array.map(r => Reservation.fromGwt(r)))
            console.log('loaded reservations')
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
