import GwtLocale from './GwtLocale'

function setupGwtCallback(options) {
  window.rapla = {
    RaplaCallback: function() {
      this.gwtLoaded = (starter) => {
        let registerAction = () => {
          let loginToken = starter.getValidToken()
          if (loginToken != null) {
            let accessToken = loginToken.getAccessToken()
            let p = starter.registerApi(accessToken)
            p.thenAccept((_api) => {
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
    console.debug('installing Vue RaplaGwtPlugin')
    setupGwtCallback({
      apiAvailable() {
        Vue.use(GwtLocale.Plugin, { api: window.api })
        options.onLoad()
      }
    })
  }
}
