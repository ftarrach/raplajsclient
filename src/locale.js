import Vue from 'vue'
import DateTime from '@/types/DateTime'

let ready = false

/**
 * registers Vue filters
 */
function setup() {
  if (!ready) {
    console.log('setup Locale')

    Vue.filter('localize', localize)
    ready = true
  } else {
    console.warn('Locale module is already ready')
  }
}

/**
 * returns the rapla locale string with given key
 *
 * @param {string} localeKey
 */
function localize(localeKey) {
  if (window.api) {
    let str = window.api.i18n.getString(localeKey)
    if (!str) {
      console.warn(`no resource string found for ${localeKey}`)
    }
    return str
  }
  return `»${localeKey}`
}

/**
 * returns a string for given weekday.
 *
 * always returns 'short' in standalone mode
 *
 * @param {number} rapla weekdayNr
 * @param {string} len {'short', 'long'}
 */
function formatWeekday(weekdayNr, len) {
  if (window.api) {
    if (len === 'short') {
      return window.api.locale.getWeekdayNameShort(weekdayNr)
    } else if (!len || len === 'long') {
      return window.api.locale.getWeekdayName(weekdayNr)
    } else {
      window.api.warn(`unknown length '${len}' in GwtLocale.formatWeekday`)
      return ''
    }
  }
  return [null, 'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][weekdayNr]
}

/**
 * returns a string for given datetime
 *
 * @param {DateTime} datetime
 * @param {string} len {'short', 'long'}
 */
function formatWeekdayDate(datetime, len) {
  if (!datetime || !(datetime instanceof DateTime)) {
    return ''
  }
  let weekdayNr = datetime.jsDate().getDay()
  if (++weekdayNr > 7) {
    weekdayNr -= 7
  }
  return formatWeekday(weekdayNr, len)
}

/**
 * formats the string
 *
 * @param {string} key
 * @param {Array} parameters
 */
function format(key, parameters) {
  if (!parameters) {
    if (window.api) {
      window.api.warn(
        `called ${key} with locale/format with no arguments. You may want to use locale/localize`
      )
    } else {
      console.warn(
        `called ${key} with locale/format with no arguments. You may want to use locale/localize`
      )
    }
    return ''
  }
  if (window.api) {
    return window.api.i18n.format(key, ...parameters)
  } else {
    return `»${key}[${parameters.length}]`
  }
}

/**
 *
 * @param {DateTime} a DateTime Object
 * @param {string} len { 'short', 'medium', 'long' }. 'medium' is default
 */
function formatDate(datetime, len = 'medium') {
  if (!datetime || !(datetime instanceof DateTime)) {
    return ''
  }
  if (window.api) {
    const raplaDate = datetime.gwtDate()
    let locale = window.api.locale
    if (len === 'short') {
      return locale.formatDateShort(raplaDate)
    } else if (len === 'medium') {
      return locale.formatDate(raplaDate)
    } else if (len === 'long') {
      return locale.formatDateLong(raplaDate)
    } else {
      window.api.warn(`unknown length '${len}' in GwtLocale.formatDate`)
      return ''
    }
  } else {
    // NOTE: standalone fallback
    return `${datetime.date} ${datetime.time}`
  }
}

/**
 *
 * converts a datetime into a rapla weekday number (Mo = 1, So = 7)
 *
 * @param {DateTime} a DateTime Object
 */
function getWeekday(datetime) {
  if (!(datetime instanceof DateTime)) {
    return ''
  }
  if (window.api) {
    return window.api.locale.getWeekday(datetime.gwtDate())
  } else {
    // NOTE: standalone
    return [null, 1, 2, 3, 4, 5, 6, 7][datetime.jsDate().getDay()]
  }
}

/**
 * localizes the time-part of the datetime object
 *
 * @param {DateTime} a DateTime Object
 */
function formatTime(datetime) {
  if (!(datetime instanceof DateTime)) {
    return ''
  }
  if (window.api) {
    return api.locale.formatTime(datetime.gwtTime())
  } else {
    return datetime.time
  }
}

/**
 * localizes all parts of the datetime object
 *
 * @param {DateTime} a DateTime Object
 * @param {len} length {'short', 'normal'}, default is 'normal'
 */
function formatDateTime(datetime, len = 'normal') {
  if (!(datetime instanceof DateTime)) {
    return ''
  }
  if (len === 'normal') {
    return `${getWeekday(datetime)}.${formatDate(
      datetime,
      'long'
    )} ${formatTime(datetime)}`
  } else if (len === 'short') {
    return `${formatDate(datetime, 'short')} ${formatTime(datetime)}`
  }
}

function formatAppointment(appointment) {
  if (window.api) {
    console.log(window.api.getAppointmentFormater())
    return window.api.getAppointmentFormater().getSummary(appointment)
    // return {
    //   id: 'bla',
    //   title: 'Hallo',
    //   subtitle: 'Welt'
    // }
  } else {
    const getRepeatEndtype = appointment => {
      if (
        appointment.repeating.end === null &&
        appointment.repeating.number === -1
      ) {
        return 'forever'
      } else if (appointment.repeating.number !== null) {
        return 'n-times'
      } else {
        return 'end-date'
      }
    }
    let until = ''
    switch (getRepeatEndtype(appointment)) {
      case 'forever':
        until = 'Kein Ende'
        break
      case 'n-times':
        until = `${appointment.repeating.number} Mal`
        break
      case 'end-date':
        until = `bis zum ${appointment.repeating.end.date}`
    }
    return {
      id: appointment.id,
      title: `${formatWeekday(appointment.repeating.weekdays)}
      ${formatTime(appointment.start.time)}-${formatTime(appointment.end.time)}
      ${localize(appointment.repeating.type.toLowerCase())}
    `,
      subtitle: `ab dem 05.10.17 ${until}`
    }
  }
}

export default {
  setup,
  localize,
  formatWeekday,
  format,
  formatAppointment,
  formatDate,
  formatTime,
  formatDateTime,
  getWeekday,
  formatWeekdayDate
}
