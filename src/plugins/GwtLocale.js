let i18n = null

const Api = {
  localize(value) {
    if (i18n) {
      let result = i18n.getString(value)
      if (result) {
        return result
      }
      console.warn(`WARN: no string for key ${value} found`)
    }
    return `»${value}«`
  },

  format(key, parameters) {
    if (i18n) {
      let result = i18n.format(key, ...parameters)
      if (result) {
        return result
      }
      console.warn(`WARN: no string for key ${key} found`)
    }
    return `»${key}(${parameters.join()})«`
  }
}

const Plugin = {
  install(Vue, options) {
    console.log('installing Vue GwtLocale')
    if (options.api) {
      i18n = options.api.getI18n()
    }
    Vue.filter('gwt-localize', (value) => Api.localize(value))
  }
}

export default {
  Api,
  Plugin
}
