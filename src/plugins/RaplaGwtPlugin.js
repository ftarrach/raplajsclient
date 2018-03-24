import GwtLocale from './GwtLocale'

function setupGwtCallback(options) {
  window.rapla = {
    RaplaCallback: function() {
      this.gwtLoaded = (starter) => {
        console.log('gwtloaded')
        let registerAction = () => {
          console.log('registeraction')
          let loginToken = starter.getValidToken()
          console.log(`loginToken: ${loginToken}`)
          if (loginToken != null) {
            let accessToken = loginToken.getAccessToken()
            console.log(`accessToken: ${accessToken}`)
            let p = starter.registerApi(accessToken)
            console.log(p)
            p
              .thenAccept((_api) => {
                console.log('registerapi')
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
