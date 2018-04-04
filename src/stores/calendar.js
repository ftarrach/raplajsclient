
import moment from 'moment'
import DateTime from '@/types/util/DateTime'
import User from '@/types/User'
import Reservation from '@/types/Reservation'

const calendar = {
  namespaced: true,

  state: {
    startDate: DateTime.fromMoment(moment('1970-01-01')),
    endDate: DateTime.fromMoment(moment('1970-01-01')),
    selectedDate: DateTime.fromMoment(moment('1970-01-01')),
    user: new User()
  },

  getters: {
    username: state => state.user.username,
    reservation: state => id =>
      new Promise((resolve, reject) => {
        api.getCalendarModel().queryReservations(
          api.getCalendarModel().getTimeIntervall()
        )
          .thenApply(result => {
            let r = api.toArray(result).find(r => r.getId() === id)
            if (r == null) {
              resolve(false)
            } else {
              resolve(Reservation.fromGwt(r))
            }
          })
          .exceptionally(reject)
      })
  },

  mutations: {
    refreshCalendar(state) {
      let model = api.getCalendarModel()
      state.user = User.fromGwt(model.getUser())
      state.startDate = DateTime.fromGwtDate(model.getStartDate())
      state.endDate = DateTime.fromGwtDate(model.getEndDate())
      state.selectedDate = DateTime.fromGwtDate(model.getSelectedDate())
    },

    setStartDate(state, newStartDate) { state.startDate = newStartDate },
    setEndDate(state, newEndDate) { state.endDate = newEndDate },
    setSelectedDate(state, newSelectedDate) { state.selectedDate = newSelectedDate }
  },

  actions: {

    refresh({commit}) {
      api.debug('refresh calendar model')
      api.getCalendarModel().refresh()
      commit('refreshCalendar')
    },

    loadCalendar({commit}, calendarKey) {
      console.debug(`load calendar ${calendarKey}`)
      api.getCalendarModel().load(calendarKey)
      commit('refreshCalendar')
    },

    loadAppointmentTable({getters}) {
      // TODO: implement me
      // api.getCalendarModel().setViewId('table_appointments')
      // api.loadTableModel(api.getCalendarModel())
      //   .thenAccept(table => {
      //     console.log(table.getColumns().map(c => c.getColumnName()))
      //     console.log(table.getColumnClass(0))
      //     console.log(table.getAllRows())
      //   })
      //   .exceptionally(openErrorDialog)
    },

    loadReservationTable({commit}) {
      api.debug('load reservations')
      return new Promise((resolve, reject) => {
        api.getCalendarModel().setViewId('table_events')
        api.loadTableModel(api.getCalendarModel())
          .thenAccept(table => {
            const columns = table.getColumns().map(c => ({
              name: c.getColumnName(),
              type: c.getType().name()
            }))
            const rows = table.getAllRows().map((row, index) => {
              let n = Array(table.getColumnCount())
              row.forEach((val, c) => {
                if (columns[c].type === 'DATE') {
                  n[c] = `${api.getRaplaLocale().getWeekday(val)}. ${api.getRaplaLocale().formatDateLong(val)} ${api.getRaplaLocale().formatTime(val)}`
                } else {
                  n[c] = val
                }
              })
              return {
                id: table.getObjectAt(index).getId(),
                data: n
              }
            })
            const gwtObjects = [...Array(table.getRowCount()).keys()].map(i => table.getObjectAt(i))
            resolve({ columns, rows, gwtObjects })
          }).exceptionally(reject)
      })
    },

    loadAppointmentsOnDay() {
      return new Promise((resolve, reject) => {
        let today = api.getCalendarModel().getSelectedDate()
        let next = DateTime.toGwtDate(
          DateTime.fromMoment(
            DateTime.toMoment(
              DateTime.fromGwtDate(
                api.getCalendarModel().getSelectedDate()
              )
            ).add(1, 'day')
          )
        )
        let start = api.getCalendarModel().getStartDate()
        let end = api.getCalendarModel().getEndDate()
        api.getCalendarModel().setStartDate(today)
        api.getCalendarModel().setEndDate(next)
        api.getCalendarModel().queryBlocks(api.getCalendarModel().getTimeIntervall()).thenAccept(res => resolve(api.toArray(res)))
          .exceptionally(reject)
        api.getCalendarModel().setStartDate(start)
        api.getCalendarModel().setEndDate(end)
      })
    },

    setStartDate({commit, dispatch}, newStartDate) {
      api.getCalendarModel().setStartDate(DateTime.toGwtDate(newStartDate))
      commit('setStartDate', newStartDate)
    },

    setEndDate({commit, dispatch}, newEndDate) {
      let add1 = DateTime.fromMoment(DateTime.toMoment(newEndDate).add(1, 'day'))
      api.getCalendarModel().setEndDate(DateTime.toGwtDate(add1))
      commit('setEndDate', newEndDate)
    },

    setSelectedDate({commit}, newSelectedDate) {
      api.getCalendarModel().setSelectedDate(DateTime.toGwtDate(newSelectedDate))
      commit('setSelectedDate', newSelectedDate)
    }
  }
}

export default calendar
