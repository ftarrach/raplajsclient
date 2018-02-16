import moment from 'moment'

export default {

  state: {
    from: moment().startOf('isoweek'),
    to: moment().endOf('isoweek'),
    date: moment('2017-10-03') // DEBUG: to view demodata. In Production: moment()
  },

  mutations: {

    updateFrom(state, newValue) {
      if (state.to.isBefore(newValue)) {
        state.to = newValue.clone()
      }
      state.from = newValue
    },

    updateTo(state, newValue) {
      if (state.from.isAfter(newValue)) {
        state.from = newValue.clone()
      }
      state.to = newValue
    },

    updateDate(state, newValue) {
      state.date = newValue
    }

  }
}
