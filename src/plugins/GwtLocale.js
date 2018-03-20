/* global api */

import DateTime from '@/types/util/DateTime'

let i18n = null
let locale = null

const Api = {

  localize(value) {
    let result = i18n.getString(value)
    if (result) {
      return result
    }
    api.warn(`no string for key ${value} found`)
    return `»${value}«`
  },

  format(key, parameters) {
    let result = i18n.format(key, ...parameters)
    if (result) {
      return result
    }
    api.warn(`no string for key ${key} found`)
    return `»${key}(${parameters.join()})«`
  },

  formatDateTime(date) {
    if (!date) {
      return ''
    }
    // TODO: gwt: einfach zusammenbauen über date + time + formatWeekday?
    return DateTime.toMoment(date).format('DD.MM.YYYY (dd) HH:mm')
  },

  formatWeekday(weekdayNr, len) {
    if (!weekdayNr) {
      return ''
    }
    if (++weekdayNr > 7) {
      weekdayNr -= 7
    }
    if (len === 'short') {
      return locale.getWeekdayNameShort(weekdayNr)
    } else if (!len || len === 'long') {
      return locale.getWeekdayName(weekdayNr)
    } else {
      api.warn(`unknown length '${len}' in GwtLocale.formatWeekday`)
      return ''
    }
  },

  formatDate(date, len) { // date = {years: …, months: …, …}
    if (!date) {
      return ''
    }
    let raplaDate = locale.toRaplaDate(date.years, date.months, date.date)
    if (len === 'short') {
      return locale.formatDateShort(raplaDate)
    } else if (!len || len === 'medium') {
      return locale.formatDate(raplaDate)
    } else if (len === 'long') {
      return locale.formatDateLong(raplaDate)
    } else {
      api.warn(`unknown length '${len}' in GwtLocale.formatDate`)
      return ''
    }
  },

  formatTime(date) { // date = {hours: …, minutes: …, …}
    if (!date) {
      return ''
    }
    return locale.formatTime(locale.toTime(date.hours, date.minutes, date.seconds))
  }
}

const Plugin = {
  install(Vue, options) {
    api.debug('installing Vue GwtLocale')
    if (options.api) {
      i18n = options.api.getI18n()
      locale = options.api.getRaplaLocale()
    }
    Vue.filter('gwt-localize', (value) => Api.localize(value))
    Vue.filter('gwt-formatDate', (value, len) => Api.formatDate(value, len))
    Vue.filter('gwt-formatTime', (value, len) => Api.formatTime(value, len))
    Vue.filter('gwt-formatDateTime', (value, len) => Api.formatDateTime(value, len))
    Vue.filter('gwt-formatWeekday', (value, len) => Api.formatWeekday(value, len))
  }
}

export default {
  Api,
  Plugin
}
