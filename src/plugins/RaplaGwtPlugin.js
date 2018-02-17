/* global rapla */

import GwtLocale from './GwtLocale'
import GwtUser from './GwtUser'

require('./gwtEvents.js')

let api = null

function setupGwtCallback(options) {
  window.rapla = {
    RaplaCallback: function() {
      this.gwtLoaded = (starter) => {
        let registerAction = () => {
          let loginToken = starter.getValidToken()
          if (loginToken != null) {
            starter.registerApi(loginToken.getAccessToken()).thenAccept(new rapla.Consumer((_api) => {
              api = _api
              window.api = _api
              options.apiAvailable()
            }))
          } else {
            window.location = '../rapla/login?url=' + window.location
          }
        }
        starter.initLocale('de_DE')
          .thenRun(new rapla.Action(registerAction))
          .exceptionally(new rapla.Catch((info) => console.warn(info)))
      }
    }
  }
}

const Api = {
  locale: GwtLocale.Api,
  user: GwtUser.Api
}

function installChildPlugins(Vue, options) {
  Vue.mixin({ beforeCreate: function() {
    const options = this.$options
    if (options.rapla) {
      this.$rapla = Api
    } else if (options.parent && options.parent.$rapla) {
      this.$rapla = options.parent.$rapla
    }
  }})
  Vue.use(GwtLocale.Plugin, { api })
  console.log('meep')
  Vue.use(GwtUser.Plugin, { api })
  options.onLoad()
}

export default {
  install(Vue, options) {
    if (options.standaloneMode) {
      console.log('starting Vue Client in Standalone Mode')
      installChildPlugins(Vue, options)
    } else {
      console.log('starting Vue Client in GWT Mode')
      console.log('installing Vue RaplaGwtPlugin')
      setupGwtCallback({
        apiAvailable() {
          installChildPlugins(Vue, options)
        }
      })
    }
  }
}
