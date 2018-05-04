import Classification from './Classification'
import Allocatable from './Allocatable'
import DateTime from './DateTime'
import Appointment from './Appointment'
import DynamicType from './DynamicType'

class Reservation {
  constructor(GWT, id, name, type, classification, allocatables, appointments, permissions, createDate, lastChange, firstDate) {
    this.GWT = GWT
    this.id = id
    this.name = name
    this.type = type
    this.classification = classification
    this.allocatables = allocatables
    this.appointments = appointments
    this.permissions = permissions
    this.createDate = createDate
    this.lastChange = lastChange
    this.firstDate = firstDate
  }

  static fromGwt(gwtReservation) {
    return new Reservation(
      gwtReservation,
      gwtReservation.getId(),
      gwtReservation.getName(),
      DynamicType.fromGwt(gwtReservation.getClassification().getType()),
      Classification.fromGwt(gwtReservation.getClassification()),
      gwtReservation.getAllocatables().map(Allocatable.fromGwt),
      api.toArray(gwtReservation.getSortedAppointments()).map(Appointment.fromGwt),
      [ /* TODO: permissions */ ],
      DateTime.createFromGwtDate(gwtReservation.getCreateDate()),
      DateTime.createFromGwtDate(gwtReservation.getLastChanged()),
      DateTime.createFromGwtDate(gwtReservation.getFirstDate())
    )
  }
}

export default Reservation
