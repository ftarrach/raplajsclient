class Appointment {
  constructor(id, repeat, begin, days, time, end, enddatetype) {
    this.id = id
    this.repeat = repeat
    this.begin = begin
    this.days = days
    this.time = time
    this.end = null
    this.enddatetype = enddatetype
  }
}

export default Appointment
