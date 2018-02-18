import moment from 'moment'

let i18n = null
let locale = null

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
  },

  formatDateTime(date) {
    if (locale) {
      // ASK: Where is this Date Format in Rapla?
      return moment(date).format('DD.MM.YYYY (dd) HH:mm')
    } else {
      return moment(date).format('DD.MM.YYYY (dd) HH:mm')
    }
  },

  formatDate(date, len) { // date = {years: …, months: …, …}
    if (!date) {
      return ''
    }
    if (locale) {
      if (len === 'short') {
        return locale.formatDateShort(locale.toRaplaDate(date.years, date.months, date.date))
      } else if (!len || len === 'medium') {
        return locale.formatDate(locale.toRaplaDate(date.years, date.months, date.date))
      } else if (len === 'long') {
        return locale.formatDateLong(locale.toRaplaDate(date.years, date.months, date.date))
      } else {
        console.warn(`unknown length '${len}' in GwtLocale.formatDate`)
        return ''
      }
    } else {
    // ASK: Where is this Date Format in Rapla?
      return moment(date).format('DD.MM.YYYY')
    }
  },

  formatTime(date) { // date = {hours: …, minutes: …, …}
    console.log(date)
    if (locale) {

    }
    return moment(date).format('HH:mm')
  }
}

const Plugin = {
  install(Vue, options) {
    console.log('installing Vue GwtLocale')
    if (options.api) {
      i18n = options.api.getI18n()
      locale = options.api.getRaplaLocale()
    }
    Vue.filter('gwt-localize', (value) => Api.localize(value))
    Vue.filter('gwt-formatDate', (value, len) => Api.formatDate(value, len))
    Vue.filter('gwt-formatTime', (value, len) => Api.formatTime(value, len))
    Vue.filter('gwt-formatDateTime', (value, len) => Api.formatDateTime(value, len))
  }
}

export default {
  Api,
  Plugin
}
