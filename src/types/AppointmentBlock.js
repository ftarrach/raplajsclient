import DateTime from './util/DateTime'

// FIXME: currently this class is nowhere needed
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
    const { resources, persons } = [] // TODO: does not work, since getAllocatablesFor returns a Java Stream
    // console.log(appointment.getReservation().getAllocatablesFor(appointment))
    //    const allocatables = appointment.getReservation().getAllocatablesFor(appointment)
    //
    //    const [ resources, persons ] =
    //      allocatables.reduce((acc, a) => {
    //        acc[a.isPerson() ? 1 : 0].push(a.getName())
    //        return acc
    //      }, [[], []])

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
