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
}
