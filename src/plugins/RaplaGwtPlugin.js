import GwtLocale from './GwtLocale'
import GwtUser from './GwtUser'
import GwtData from './GwtData'

require('./gwtEvents.js')

let api = null

function setupGwtCallback(options) {
  window.rapla = {
    RaplaCallback: function() {
      this.gwtLoaded = (starter) => {
        let registerAction = () => {
          let loginToken = starter.getValidToken()
          if (loginToken != null) {
            starter.registerApi(loginToken.getAccessToken()).thenAccept((_api) => {
              api = _api
              window.api = _api
              options.apiAvailable()
            })
          } else {
            window.location = '../rapla/login?url=' + window.location
          }
        }
        starter.initLocale('de_DE')
          .thenRun(registerAction)
          .exceptionally((info) => console.warn(info))
      }
    }
  }
}

const Api = {
  locale: GwtLocale.Api,
  user: GwtUser.Api,
  data: GwtData.Api
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
  Vue.use(GwtUser.Plugin, { api })
  Vue.use(GwtData.Plugin, { api })
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
