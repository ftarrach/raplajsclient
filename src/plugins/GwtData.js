import demodata from '../stores/facade/demodata'
import ReservationType from '@/types/ReservationType'

let api = null

const Api = {
  allCalendars() {
    if (api) {
      return api.getCalendarNames()
    }
    return [ 'Default', 'Test' ]
  },
  loadCalendarModel(name) {
    if (api) {
      api.getCalendarModel().load(name)
    }
  },
  reservationTypes() {
    if (api) {
      return api.getFacade().getDynamicTypes('reservation').map(d => {
        return new ReservationType(d.getId(), d.getName())
      })
    }
    return demodata.reservationtypes
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
