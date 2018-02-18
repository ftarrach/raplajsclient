let api = null

const Api = {
  allCalendars() {
    if (api) {
      return api.getCalendarNames()
    }
    return [ '»Default', '»Test' ]
  },
  loadCalendarModel(calendar) {
    if (api) {
      api.getCalendarModel().load(calendar)
    }
  }
}

const Plugin = {
  install(Vue, options) {
    console.log('installing Vue GwtData')
    if (options.api) {
      api = options.api
    }
  }
}

export default { Api, Plugin }
