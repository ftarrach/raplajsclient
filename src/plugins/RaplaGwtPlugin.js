import GwtLocale from './GwtLocale'

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
            }).exceptionally(e => {
              console.error(e)
            })
          } else {
            window.location = '../rapla/login?url=' + window.location
          }
        }
        starter.initLocale('de_DE') // TODO: move this to locale store and save the current locale key as a state?
          .thenRun(registerAction)
          .exceptionally(console.warn)
      }
    }
  }
}

export default {
  install(Vue, options) {
    if (options.standaloneMode) {
      console.debug('starting Vue Client in Standalone Mode')
      Vue.use(GwtLocale.Plugin, { api })
      options.onLoad()
    } else {
      console.debug('starting Vue Client in GWT Mode')
      console.debug('installing Vue RaplaGwtPlugin')
      setupGwtCallback({
        apiAvailable() {
          Vue.use(GwtLocale.Plugin, { api })
          options.onLoad()
        }
      })
    }
  }
}
