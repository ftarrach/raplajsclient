import moment from 'moment'
import DateTime from './util/DateTime'

class AppointmentBlock {
  constructor(name, start, end, resources, persons) {
    this.name = name
    this.start = start
    this.end = end
    this.resources = resources
    this.persons = persons
  }

  static fromGwt(gwtBlock) {
    let appointment = gwtBlock.getAppointment()
    let allocatables = appointment.getReservation().getAllocatablesFor(appointment)
    return new AppointmentBlock(
      gwtBlock.getAppointment().getReservation().getName(),
      DateTime.fromMoment(moment(gwtBlock.getStart())),
      DateTime.fromMoment(moment(gwtBlock.getEnd())),
      allocatables.filter(a => !a.isPerson()).map(a => a.getName()),
      allocatables.filter(a => a.isPerson()).map(a => a.getName())
    )
  }
}

export default AppointmentBlock
