import demodata from '../stores/facade/demodata'
import DynamicType from '@/types/DynamicType'
import Attribute from '@/types/Attribute'

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
        return new DynamicType(
          d.getId(),
          d.getName(),
          d.getAttributes().map(a => {
            return new Attribute(
              a.getKey(),
              a.getName(),
              a.getType().name()
            )
          })
        )
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
