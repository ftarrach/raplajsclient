/* global api */

import moment from 'moment'
import DateTime from '@/types/util/DateTime'
import User from '@/types/User'
import Appointment from '@/types/Appointment'
import Reservation from '@/types/Reservation'

const calendar = {
  namespaced: true,

  state: {
    startDate: DateTime.fromMoment(moment('1970-01-01')),
    endDate: DateTime.fromMoment(moment('1970-01-01')),
    user: new User(),
    appointments: [],
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
      state.appointments = blocks.map(b => Appointment.fromGwt(b.getAppointment()))
    },

    setReservations(state, blocks) {
      state.reservations =
        blocks.map(b => b.getAppointment().getReservation())
          .filter((reservation, index, self) => self.findIndex(other => other.getId() === reservation.getId()) === index)
          .map(r => Reservation.fromGwt(r))
    },

    setStartDate(state, newStartDate) {
      state.startDate = newStartDate
    },

    setEndDate(state, newEndDate) {
      state.endDate = newEndDate
    }
  },

  actions: {
    loadCalendar({commit}, calendarKey) {
      api.getCalendarModel().load(calendarKey)
      commit('refreshCalendar')
    },

    loadAppointments({commit}) {
      api.getCalendarModel().queryBlocks(api.getCalendarModel().getTimeIntervall())
        .thenAccept(b => {
          let blocks = b.array_2_g$
          commit('setAppointments', blocks)
          commit('setReservations', blocks)
        })
        .exceptionally(console.warn)
    },

    setStartDate({commit, dispatch}, newStartDate) {
      api.getCalendarModel().setStartDate(DateTime.toGwtDate(newStartDate))
      commit('setStartDate', newStartDate)
      dispatch('loadAppointments')
    },

    setEndDate({commit, dispatch}, newEndDate) {
      console.log(`new end date: ${JSON.stringify(newEndDate)}`)
      api.getCalendarModel().setEndDate(DateTime.toGwtDate(newEndDate))
      commit('setEndDate', newEndDate)
      dispatch('loadAppointments')
    }
  }
}

export default calendar
