import demodata from './demodata'

export default {

  state: {
    calendars: demodata.calendars,
    resourceTypes: demodata.resourcetypes,
    resources: demodata.resources,
    reservations: demodata.reservations,
    reservationtypes: demodata.reservationtypes
  },

  getters: {
    // List<DynamicTypes> (optional)
    allResourceTypes: (state) => {
      return state.resourceTypes
    },
    // List<Allocatable> (optional)
    allResources: (state) => {
      return state.resources
    },
    allReservationTypes: (state) => {
      return state.reservationtypes
    },
    allCalendars: (state) => {
      return state.calendars
    },
    // List<AppointmentBlock> (AppointmentBlock = 1 konkreter Termin, weil 1 Appointment kann n Reservierungen haben)
    appointmentsInPeriod: (state) => {
      // Implementierung: CalendarModel.queryBlocks(TimeInterval)
      // TODO: use userinputstate to filter
      return state.reservations
    },
    // List<Reservation>
    eventsInPeriod: (state) => {
      return state.reservations
    },
    // List<Reservation>
    reservationsOnDate: (state, _, rootState) => {
      // CalendarModel.queryReservations
      return state.reservations
                  .filter(r => r.begin.isSame(rootState.user.date, 'day'))
    },
    reservationsOnWeek: (state, _, rootState) => {
      // CalendarModel.queryReservations
      return state.reservations
                  .filter(r => r.begin.isSame(rootState.user.date, 'isoweek'))
    },
    resourcesForType: (state) => (typeId) => {
      return state.resources
                  .filter(r => r.type.id === typeId)
    },
      // CalendarModel.queryReservations
    reservationsInPeriod: (state, _, rootState) => {
      let from = rootState.user.date.clone().startOf('isoweek')
      let to = rootState.user.date.clone().endOf('isoweek')
      return state.reservations
                  .filter(r => r.begin.isAfter(from) &&
                               r.begin.isBefore(to))
    },
    reservationById: (state) => (id) => {
      return state.reservations
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
