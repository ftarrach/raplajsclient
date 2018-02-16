/* global rapla */

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

function localize(value) {
  let result = api.getI18n().getString(value)
  if (result) {
    return result
  } else {
    console.warn(`WARN: no string for key ${value} found`)
    return `»${value}«`
  }
}

const Api = {
  localize(value) {
    return localize(value)
  }
}

const GwtSetup = {
  install(Vue, options = {}) {
    console.log('installing Vue RaplaGwtPlugin')
    setup(options)

    Vue.filter('gwt-localize', function(value) {
      return localize(value)
    })
    Vue.mixin({ beforeCreate: init })

    function init() {
      const options = this.$options
      if (options.rapla) {
        this.$rapla = options.rapla
      } else if (options.parent && options.parent.$rapla) {
        this.$rapla = options.parent.$rapla
      }
    }
  }
}

export { Api, GwtSetup }
