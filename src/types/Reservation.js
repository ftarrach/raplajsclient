import Classification from './Classification'
import Allocatable from './Allocatable'
import DateTime from './util/DateTime'
import Appointment from './Appointment'

class Reservation {
  constructor(id, name, classification, allocatables, appointments, permissions, createDate, lastChange) {
    this.id = id
    this.name = name
    this.classification = classification
    this.allocatables = allocatables
    this.appointments = appointments
    this.permissions = permissions
    this.createDate = createDate
    this.lastChange = lastChange
  }

  static fromGwt(gwtReservation) {
    return new Reservation(
      gwtReservation.getId(),
      gwtReservation.getName(),
      Classification.fromGwt(gwtReservation.getClassification()),
      gwtReservation.getAllocatables().map(Allocatable.fromGwt),
      gwtReservation.getAppointments().map(Appointment.fromGwt),
      [/* TODO: permissions */],
      DateTime.fromGwtDate(gwtReservation.getCreateDate()),
      DateTime.fromGwtDate(gwtReservation.getLastChanged())
    )
  }
}

export default Reservation

window.Reservation = Reservation
