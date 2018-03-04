import Classification from './Classification'
import Allocatable from './Allocatable'
import DateTime from './util/DateTime'
import Appointment from './Appointment'
import DynamicType from './DynamicType'

class Reservation {
  constructor(id, name, type, classifications, allocatables, appointments, permissions, createDate, lastChange, firstDate) {
    this.id = id
    this.name = name
    this.type = type
    this.classifications = classifications
    this.allocatables = allocatables
    this.appointments = appointments
    this.permissions = permissions
    this.createDate = createDate
    this.lastChange = lastChange
    this.firstDate = firstDate
  }

  static fromGwt(gwtReservation) {
    return new Reservation(
      gwtReservation.getId(),
      gwtReservation.getName(),
      DynamicType.fromGwt(gwtReservation.getClassification().getType()),
      Classification.fromGwt(gwtReservation.getClassification()),
      gwtReservation.getAllocatables().map(Allocatable.fromGwt),
      gwtReservation.getAppointments().map(Appointment.fromGwt),
      [ /* TODO: permissions (current: Collection, array needed) */ ],
      DateTime.fromGwtDate(gwtReservation.getCreateDate()),
      DateTime.fromGwtDate(gwtReservation.getLastChanged()),
      DateTime.fromGwtDate(gwtReservation.getFirstDate())
    )
  }
}

export default Reservation
