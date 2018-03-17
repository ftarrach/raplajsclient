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
    const appointment = gwtBlock.getAppointment()
    const allocatables = appointment.getReservation().getAllocatablesFor(appointment)

    const [ resources, persons ] =
      allocatables.reduce((acc, a) => {
        acc[a.isPerson() ? 1 : 0].push(a.getName())
        return acc
      }, [[], []])

    return new AppointmentBlock(
      appointment.getReservation().getName(),
      DateTime.fromGwtTimestamp(gwtBlock.getStart()),
      DateTime.fromGwtTimestamp(gwtBlock.getEnd()),
      resources,
      persons
    )
  }
}

export default AppointmentBlock
