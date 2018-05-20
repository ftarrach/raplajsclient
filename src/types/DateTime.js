/**
 * holds an ISO8601 date and time string
 */
class DateTime {
  constructor(date, time) {
    this.date = date
    this.time = time
  }

  static createFromJsDate(date) {
    if (!date) {
      return null
    }
    return new DateTime(
      date.toISOString().slice(0, 10),
      date.toISOString().slice(11, 19)
    )
  }

  static createFromGwtDate(gwtDate) {
    return DateTime.createFromJsDate(window.api.toJsDate(gwtDate))
  }

  sameDay(other) {
    return this.date === other.date
  }

  /**
   * returns { year, month, day }. All properties are numbers
   */
  dateObject() {
    const [year, month, day] = this.date.split('-').map(parseFloat)
    return {
      year,
      month,
      day
    }
  }

  /**
   * returns { hours, minutes, seconds }. All properties are numbers
   */
  timeObject() {
    const [hours, minutes, seconds] = this.time.split(':').map(parseFloat)
    return {
      hours,
      minutes,
      seconds
    }
  }

  /**
   * calculates the difference time between this and another datetime object.
   * There is no Date-checking whether or not the given DateTime is on the same date.
   * The result is always positive, so no negative minutes etc. will be returned
   *
   * @param {DateTime} other
   * @returns time object in format { hours, minutes, seconds }
   */
  timeDifference(other) {
    if (!(other instanceof DateTime)) {
      throw Error(
        `called timeDifference() with ${JSON.stringify(
          other
        )}, expected DateTime`
      )
    }
    const ms = Math.abs(other.jsDate() - this.jsDate())
    let seconds = Math.floor(ms / 1000)
    let minutes = Math.floor(seconds / 60)
    seconds = seconds % 60
    let hours = Math.floor(minutes / 60)
    minutes = minutes % 60
    return {
      hours,
      minutes,
      seconds
    }
  }

  jsDate() {
    return new Date(`${this.date}T${this.time}Z`)
  }

  toString() {
    return `${this.date} ${this.time}`
  }

  gwtDate() {
    if (window.api) {
      const date = this.dateObject()
      return window.api
        .locale
        .toRaplaDate(date.year, date.month, date.day)
    } else {
      throw Error(
        'called gwtDate() in standalone mode. Please check first if window.api is available'
      )
    }
  }

  gwtTime() {
    const time = this.timeObject()
    if (window.api) {
      return window.api.locale.toTime(time.hours, time.minutes, time.seconds)
    } else {
      throw Error(
        'called gwtTime() in standalone mode. Please check first if window.api is available'
      )
    }
  }

  gwtDateTime() {
    if (window.api) {
      const date = this.gwtDate()
      const time = this.gwtTime()
      return window.api.locale.toDate(date, time)
    } else {
      throw Error(
        'called gwtDateTime() in standalone mode. Please check first if window.api is available'
      )
    }
  }
}

export default DateTime
