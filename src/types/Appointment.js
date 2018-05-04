import Repeating from './Repeating'
import DateTime from './DateTime'

class Appointment {
  constructor(GWT, id, start, end, maxEnd, repeating, isWholeDay, reservationId, allocatables) {
    this.GWT = GWT
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
      gwtAppointment,
      gwtAppointment.getId(),
      DateTime.createFromGwtDate(gwtAppointment.getStart()),
      DateTime.createFromGwtDate(gwtAppointment.getEnd()),
      DateTime.createFromGwtDate(gwtAppointment.getMaxEnd()),
      Repeating.fromGwt(gwtAppointment.getRepeating()),
      gwtAppointment.isWholeDaysSet(),
      gwtAppointment.getReservation().getId(),
      api.streamToArray(gwtAppointment.getReservation().getAllocatablesFor(gwtAppointment)).map(a => a.getId())
    )
  }
}

export default Appointment
