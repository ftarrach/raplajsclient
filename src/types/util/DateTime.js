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
    const locale = api.getRaplaLocale()
    const rapladate = locale.toRaplaDate(years, months, date)
    const raplatime = locale.toTime(hours, minutes, seconds)
    return locale.toDate(rapladate, raplatime)
  }

  static now() {
    return DateTime.fromJs(new Date())
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
  return one.years === other.years && one.months === other.months && one.date === other.date
}

const _MS_PER_DAY = 1000 * 60 * 60 * 24
const daysDifference = function(minor, major) {
  const a = DateTime.toJs(minor)
  const b = DateTime.toJs(major)
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

const tomorrow = function(today) {
  return DateTime.fromMoment(DateTime.toMoment(today).add(1, 'day'))
}

export { sameDay, daysDifference, tomorrow }
