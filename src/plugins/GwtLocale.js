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
    if (!date) {
      return ''
    }
    if (locale) {
      // REVIEW: Where is this Date Format in Rapla?
      // TODO: einfach zusammenbauen date + time
      return moment(date).format('DD.MM.YYYY (dd) HH:mm')
    } else {
      return moment(date).format('DD.MM.YYYY (dd) HH:mm')
    }
  },

  formatWeekday(weekdayNr, len) {
    if (weekdayNr === undefined || weekdayNr === null) {
      return ''
    }
    if (locale) {
      if (++weekdayNr > 7) {
        weekdayNr -= 7
      }
      if (len === 'short') {
        return locale.getWeekdayNameShort(weekdayNr)
      } else if (!len || len === 'long') {
        return locale.getWeekdayName(weekdayNr)
      } else {
        console.warn(`unknown length '${len}' in GwtLocale.formatWeekday`)
        return ''
      }
    }
    if (len === 'short') {
      return moment().isoWeekday(weekdayNr).format('dd')
    } else if (!len || len === 'long') {
      return moment().isoWeekday(weekdayNr).format('dddd')
    }
  },

  formatDate(date, len) { // date = {years: …, months: …, …}
    if (!date) {
      return ''
    }
    if (locale) {
      let raplaDate = locale.toRaplaDate(date.years, date.months, date.date)
      if (len === 'short') {
        return locale.formatDateShort(raplaDate)
      } else if (!len || len === 'medium') {
        return locale.formatDate(raplaDate)
      } else if (len === 'long') {
        return locale.formatDateLong(raplaDate)
      } else {
        console.warn(`unknown length '${len}' in GwtLocale.formatDate`)
        return ''
      }
    } else {
      return moment(date).format('DD.MM.YYYY')
    }
  },

  formatTime(date) { // date = {hours: …, minutes: …, …}
    if (!date) {
      return ''
    }
    if (locale) {
      return locale.formatTime(locale.toTime(date.hours, date.minutes, date.seconds))
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
    Vue.filter('gwt-formatWeekday', (value, len) => Api.formatWeekday(value, len))
  }
}

export default {
  Api,
  Plugin
}
