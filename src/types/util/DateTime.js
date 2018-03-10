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
      // HACK: works, but is inperformant. Better try direct parsing
      return DateTime.fromMoment(moment(api.toJsDate(gwtDate)))
    }
    return gwtDate
  }

  static toGwtDate(datetime) {
    /* global api */
    let locale = api.getRaplaLocale()
    let date = locale.toRaplaDate(datetime.years, datetime.months, datetime.date)
    let time = locale.toTime(datetime.hours, datetime.minutes, datetime.seconds)
    return locale.toDate(date, time)
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
