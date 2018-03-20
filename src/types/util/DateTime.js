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

  static clone({ years, months, date, hours, minutes, seconds }) {
    return new DateTime(
      years,
      months,
      date,
      hours,
      minutes,
      seconds
    )
  }

  static fromMoment(moment) {
    let dt = new DateTime(...moment.utc().toArray())
    dt.months++
    return dt
  }

  static toMoment(datetime) {
    if (!datetime) {
      return
    }
    return moment.utc(moment({
      years: datetime.years,
      months: datetime.months - 1,
      date: datetime.date,
      hours: datetime.hours,
      minutes: datetime.minutes,
      seconds: datetime.seconds
    }))
  }

  static fromGwtDate(gwtDate) {
    if (gwtDate) {
      /* global api */
      return DateTime.fromJs(api.toJsDate(gwtDate))
    }
    return gwtDate
  }

  static fromGwtTimestamp(gwtTimestamp) {
    return DateTime.fromJs(
      new Date(gwtTimestamp)
    )
  }

  static toGwtDate({ years, months, date, hours, minutes, seconds }) {
    /* global api */
    const locale = api.getRaplaLocale()
    const rapladate = locale.toRaplaDate(years, months, date)
    const raplatime = locale.toTime(hours, minutes, seconds)
    return locale.toDate(rapladate, raplatime)
  }

  static fromJs(jsdate) {
    return new DateTime(
      jsdate.getFullYear(),
      jsdate.getMonth() + 1,
      jsdate.getDate(),
      jsdate.getHours(),
      jsdate.getMinutes(),
      jsdate.getSeconds()
    )
  }

  static toJs(datetime) {
    return new Date(
      datetime.years,
      datetime.months - 1,
      datetime.date,
      datetime.hours,
      datetime.minutes,
      datetime.seconds
    )
  }
}

const sameDay = function(one, other) {
  return one.year === other.year && one.months === other.months && one.date === other.date
}

export { sameDay }
