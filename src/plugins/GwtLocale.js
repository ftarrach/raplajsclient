let api = null

const Api = {
  localize(value) {
    if (api) {
      let result = api().getI18n().getString(value)
      if (result) {
        return result
      }
    }
    return `»${value}«`
  },

  format(key, parameters) {
    if (api) {
      let result = api().getI18n().format(key, ...parameters)
      if (result) {
        return result
      }
    }
    return `»${key}(${parameters.join()})«`
  }
}

const Plugin = {
  install(Vue, options) {
    console.log('installing Vue GwtLocale')
    api = options.getApi()
    Vue.filter('gwt-localize', (value) => Api.localize(value))
  }
}

export default {
  Api,
  Plugin
}

window.l = Api.format
