import moment from 'moment'

export default class DateTime {
  constructor(years, months, date, hours, minutes, seconds) {
    this.years = years
    this.months = months
    this.date = date
    this.hours = hours
    this.minutes = minutes
    this.seconds = seconds
  }

  static fromMoment(moment) {
    return new DateTime(...moment.toArray())
  }

  static fromGwtDate(date) {
    if (date) {
      /* global api */
      // HACK: works, but is inperformant. Better try direct parsing
      return DateTime.fromMoment(moment(api.toJsDate(date)))
    }
    return date
  }
}
