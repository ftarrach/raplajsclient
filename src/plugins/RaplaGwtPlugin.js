/* global rapla */

import GwtLocale from './GwtLocale'

require('./gwtEvents.js')

let api = null

function setup(options) {
  window.rapla = {
    RaplaCallback: function() {
      this.gwtLoaded = (starter) => {
        let errorFunction = new rapla.Catch((info) => console.log(info))
        let registerAction = () => {
          let loginToken = starter.getValidToken()
          if (loginToken != null) {
            let accessToken = loginToken.getAccessToken()
            console.log('AccessToken ' + accessToken)
            starter.registerApi(accessToken).thenAccept(new rapla.Consumer((_api) => {
              api = _api
              window.api = _api
              options.onLoad()
            }))
          } else {
            window.location = '../rapla/login?url=' + window.location
          }
        }
        starter.initLocale('de_DE')
          .thenRun(new rapla.Action(registerAction))
          .exceptionally(errorFunction)
      }
    }
  }
}

const Api = {
  locale: GwtLocale.Api
}

export default {
  install(Vue, options) {
    console.log('installing Vue RaplaGwtPlugin')
    setup({
      onLoad() {
        Vue.use(GwtLocale.Plugin, { getApi: () => api })
        options.onLoad()
      }
    })
    Vue.mixin({ beforeCreate: function() {
      const options = this.$options
      if (options.rapla) {
        this.$rapla = Api
      } else if (options.parent && options.parent.$rapla) {
        this.$rapla = options.parent.$rapla
      }
    }})
  }
}
