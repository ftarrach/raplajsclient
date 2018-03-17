/* global api */

import DateTime from '@/types/util/DateTime'

const locale = {
  namespaced: true,

  getters: {
    localize: state => localeKey => {
      if (api) {
        let str = api.getI18n().getString(localeKey)
        if (!str) {
          console.warn(`no resource string found for ${localeKey}`)
        }
        return str
      }
    },

    format: state => (key, parameters) => {
      if (!parameters) {
        console.warn(`called ${key} with locale/format with no arguments. You may want to use locale/localize`)
        return ''
      }
      if (api) {
        return api.getI18n().format(key, ...parameters)
      }
    },

    formatDateTime: state => date => {
      if (api) {
        // TODO: use rapla here. Build together
        return DateTime.toMoment(date).format('DD.MM.YYYY (dd) HH:mm')
      }
    },

    formatWeekday: state => (weekdayNr, len) => {
      if (api) {
        if (++weekdayNr > 7) {
          weekdayNr -= 7
        }
        if (len === 'short') {
          return api.getRaplaLocale().getWeekdayNameShort(weekdayNr)
        } else if (!len || len === 'long') {
          return api.getRaplaLocale().getWeekdayName(weekdayNr)
        } else {
          console.warn(`unknown length '${len}' in GwtLocale.formatWeekday`)
          return ''
        }
      }
    },

    getWeekday: state => date => api.getRaplaLocale().getWeekday(DateTime.toGwtDate(date)),

    formatDate: state => (date, len) => {
      if (!date) {
        return ''
      }
      if (api) {
        let locale = api.getRaplaLocale()
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
      }
    },

    formatTime: state => (date) => {
      if (api) {
        return api.getRaplaLocale().formatTime(api.getRaplaLocale().toTime(date.hours, date.minutes, date.seconds))
      }
    }

  }
}

export default locale
