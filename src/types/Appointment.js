// FIXME: convert to gwt
class Appointment {
  constructor(id, repeat, begin, days, timespan, end, enddatetype) {
    this.id = id
    this.repeat = repeat
    this.begin = begin
    this.days = days
    this.time = timespan
    this.end = null
    this.enddatetype = enddatetype
  }
}

class Repeat {
  constructor(type, interval, times = 1) {
    this.type = type
    this.interval = interval
    this.times = times
  }
}

export { Appointment, Repeat }
