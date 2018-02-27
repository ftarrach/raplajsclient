import DateTime from './util/DateTime'
import Repeating from './Repeating'

class Appointment {
  constructor(id, start, end, maxEnd, repeating, isWholeDay) {
    this.id = id
    this.start = start
    this.end = end
    this.maxEnd = maxEnd
    this.repeating = repeating
    this.isWholeDay = isWholeDay
  }

  static fromGwt(gwtAppointment) {
    return new Appointment(
      gwtAppointment.getId(),
      DateTime.fromGwtDate(gwtAppointment.getStart()),
      DateTime.fromGwtDate(gwtAppointment.getEnd()),
      DateTime.fromGwtDate(gwtAppointment.getMaxEnd()),
      Repeating.fromGwt(gwtAppointment.getRepeating()),
      gwtAppointment.isWholeDaysSet()
    )
  }
}

export default Appointment
