import DateTime from './util/DateTime'
import Repeating from './Repeating'

class Appointment {
  constructor(id, start, end, maxEnd, repeating, isWholeDay, reservationId, allocatables) {
    this.id = id
    this.start = start
    this.end = end
    this.maxEnd = maxEnd
    this.repeating = repeating
    this.isWholeDay = isWholeDay
    this.reservationId = reservationId
    this.allocatables = allocatables
  }

  static fromGwt(gwtAppointment) {
    return new Appointment(
      gwtAppointment.getId(),
      DateTime.fromGwtDate(gwtAppointment.getStart()),
      DateTime.fromGwtDate(gwtAppointment.getEnd()),
      DateTime.fromGwtDate(gwtAppointment.getMaxEnd()),
      Repeating.fromGwt(gwtAppointment.getRepeating()),
      gwtAppointment.isWholeDaysSet(),
      gwtAppointment.getReservation().getId(),
      gwtAppointment.getReservation().getAllocatablesFor(gwtAppointment).map(a => a.getId())
    )
  }
}

export default Appointment
