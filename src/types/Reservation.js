
class Reservation {
  constructor(id, classification, allocatables, appointments, permissions) {
    this.id = id
    this.classification = classification
    this.allocatables = allocatables
    this.appointments = appointments
    this.permissions = permissions
  }
}

export default Reservation
