class Reservation {
  constructor(id, name, begin, end, lastChange, column, type, persons, resources, appointments, permissions) {
    this.id = id
    this.name = name
    this.begin = begin
    this.end = end
    this.lastChange = lastChange
    this.column = column
    this.type = type
    this.persons = persons
    this.resources = resources
    this.appointments = appointments
    this.permissions = permissions
  }
}

export default Reservation
