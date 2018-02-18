import demodata from './demodata'
import moment from 'moment'

let resourceTypes = demodata.resourcetypes
let resources = demodata.resources
let reservations = demodata.reservations
let reservationtypes = demodata.reservationtypes

export default {

  getters: {
    // List<DynamicTypes> (optional)
    allResourceTypes: (state) => {
      return resourceTypes
    },
    // List<Allocatable> (optional)
    allResources: (state) => {
      return resources
    },
    allReservationTypes: (state) => {
      return reservationtypes
    },
    // List<AppointmentBlock> (AppointmentBlock = 1 konkreter Termin, weil 1 Appointment kann n Reservierungen haben)
    appointmentsInPeriod: (state) => {
      // Implementierung: CalendarModel.queryBlocks(TimeInterval)
      // TODO: use userinputstate to filter
      return reservations
    },
    // List<Reservation>
    eventsInPeriod: (state) => {
      return reservations
    },
    // List<Reservation>
    reservationsOnDate: (state, _, rootState) => {
      // CalendarModel.queryReservations
      return reservations
                  .filter(r => moment(r.begin).isSame(rootState.user.date, 'day'))
    },
    reservationsOnWeek: (state, _, rootState) => {
      // CalendarModel.queryReservations
      return reservations
                  .filter(r => moment(r.begin).isSame(rootState.user.date, 'isoweek'))
    },
    resourcesForType: (state) => (typeId) => {
      return resources
                  .filter(r => r.type.id === typeId)
    },
      // CalendarModel.queryReservations
    reservationsInPeriod: (state, _, rootState) => {
      let from = rootState.user.date.clone().startOf('isoweek')
      let to = rootState.user.date.clone().endOf('isoweek')
      return reservations
                  .filter(r => moment(r.begin).isAfter(from) &&
                               moment(r.begin).isBefore(to))
    },
    reservationById: (state) => (id) => {
      return reservations
                  .filter(r => r.id === id)
    }
  },

  // synchron changes to state
  mutations: {

  },

  // async state changes
  actions: {
//    demo: (context, payload) => {
//      myAsyncFunction((result) => /*  */{
//        context.commit('mutationName', payload)
//      })
//    }
  }
}
