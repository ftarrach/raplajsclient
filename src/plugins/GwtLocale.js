let api = null

const Api = {
  localize(value) {
    if (api) {
      let result = api().getI18n().getString(value)
      if (result) {
        return result
      }
    }
    console.warn(`WARN: no string for key ${value} found`)
    return `»${value}«`
  },

  format(key, parameters) {
    if (api) {
      let result = api().getI18n(key, parameters)
      if (result) {
        return result
      }
    }
    return `»${key}«`
  }
}

const Plugin = {
  install(Vue, options) {
    console.log('installing Vue GwtLocale')
    api = options.getApi
    Vue.filter('gwt-localize', (value) => Api.localize(value))
  }
}

export default {
  Api,
  Plugin
}
