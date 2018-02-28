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
    username: state => state.user.username
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
      api.getCalendarModel().queryBlocks(api.getCalendarModel().getTimeIntervall())
        .thenAccept(b => {
          let blocks = b.array_2_g$ // FIXME: server should return array instead of arraylist
          // TODO: parse blocks here in an async way, then commit the parsed blocks
          commit('setAppointments', blocks.map(b => AppointmentBlock.fromGwt(b)))
        })
        .exceptionally(console.warn)
    },

    loadReservations({commit}) {
      console.log('load reservations')
      api.getCalendarModel().queryReservations(api.getCalendarModel().getTimeIntervall())
        .thenAccept(result => {
          let array = result.array_2_g$ // FIXME: server should return array instead of arraylist
          commit('setReservations', array.map(r => Reservation.fromGwt(r)))
        })
    },

    setStartDate({commit, dispatch}, newStartDate) {
      api.getCalendarModel().setStartDate(DateTime.toGwtDate(newStartDate))
      commit('setStartDate', newStartDate)
      dispatch('loadAppointments')
    },

    setEndDate({commit, dispatch}, newEndDate) {
      api.getCalendarModel().setEndDate(DateTime.toGwtDate(newEndDate))
      commit('setEndDate', newEndDate)
      dispatch('loadAppointments')
    }
  }
}

export default calendar
