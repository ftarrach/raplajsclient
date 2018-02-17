import moment from 'moment'
import faker from 'faker'

faker.locale = 'de'

const beginWeek = moment('20171002T0000')
const lastChange = moment('20171231T1422')

const calendars = [
  { id: 1, name: 'Kalender A' },
  { id: 2, name: 'Kalender B' }
]

const resourcetypes = [
  { id: 1, name: 'Kurs' },
  { id: 2, name: 'Raum' },
  { id: 3, name: 'Person' }
]

const appointments = [
  {
    id: 10,
    repeat: { type: 'weekly', interval: 1, times: 1 },
    begin: moment('2017-10-03'),
    days: [0, 1],
    time: { from: '09:00', to: '11:15', endtype: 'same-day' },
    end: null,
    enddatetype: 'infinity'
  },
  {
    id: 11,
    repeat: { type: 'weekly', interval: 1, times: 1 },
    begin: moment('2017-10-04'),
    days: [2],
    time: { from: '09:15', to: '11:30', endtype: 'x-day', xday: 1 },
    end: moment('2017-12-20'),
    enddatetype: 'until'
  }
]
const categories = [
  {
    id: 1,
    name: 'Die Veranstaltungen anderer sehen'
  }
]
const permissions = [
  {
    id: 21,
    type: 'all', // [ all, user, group ]
    value: null, // null on all, user on user group on group
    access: 'read' // [ denied, read, edit, admin ]
  },
  // this is the default permission every reservation has
  {
    id: 22,
    type: 'group',
    value : categories[0],
    access: 'read'
  }
]

/* eslint-disable camelcase */
let rt_kurs = resourcetypes[0]
let rt_raum = resourcetypes[1]
let rt_person = resourcetypes[2]

let free = function() {
  const rnd = Math.random()
  if (rnd < 0.3) {
    return false
  } else if (rnd <= 0.6) {
    return true
  } else if (rnd <= 0.8) {
    return [2]
  } else {
    return [1, 2]
  }
}

let RESOURCE_ID = 0

// weglassen, da personen in rapla nur ressourcen sind
class Person {
  constructor(surname, firstname) {
    this.id = RESOURCE_ID++
    this.surname = surname
    this.firstname = firstname
    this.type = rt_person
    this.free = free()
  }

  toString() {
    return `${this.surname} ${this.firstname}`
  }

  compare(other) {
    let surnameCompare = this.surname.localeCompare(other.surname)
    if (surnameCompare === 0) {
      return this.firstname.localeCompare(other.firstname)
    } else {
      return surnameCompare
    }
  }
}

// = Allocatable
class Resource {
  constructor(type, name) {
    this.id = RESOURCE_ID++
    this.type = type
    this.name = name
    this.free = free()
  }

  toString() {
    return this.name
  }

  compare(other) {
    return this.name.localeCompare(other.name)
  }
}

class ReservationType {
  constructor(id, name) {
    this.id = id
    this.name = name
  }

  toString() {
    return this.name
  }
}

const reservationtypes = [
  new ReservationType(1, 'Vorlesung'),
  new ReservationType(2, 'Seminar')
]

const resources = [
  new Resource(rt_kurs, 'Klasse 1'),
  new Resource(rt_kurs, 'Klasse 2'),
  new Resource(rt_kurs, 'Klasse 3'),
  new Resource(rt_kurs, 'Klasse 4'),
  new Resource(rt_kurs, 'Klasse 5'),
  new Resource(rt_kurs, 'Klasse 6'),
  new Resource(rt_raum, faker.random.arrayElement(['A', 'B', 'C']) + faker.random.number({min: 100, max: 999})),
  new Resource(rt_raum, faker.random.arrayElement(['A', 'B', 'C']) + faker.random.number({min: 100, max: 999})),
  new Resource(rt_raum, faker.random.arrayElement(['A', 'B', 'C']) + faker.random.number({min: 100, max: 999})),
  new Resource(rt_raum, faker.random.arrayElement(['A', 'B', 'C']) + faker.random.number({min: 100, max: 999})),
  new Resource(rt_raum, faker.random.arrayElement(['A', 'B', 'C']) + faker.random.number({min: 100, max: 999})),
  new Resource(rt_raum, faker.random.arrayElement(['A', 'B', 'C']) + faker.random.number({min: 100, max: 999})),
  new Resource(rt_raum, faker.random.arrayElement(['A', 'B', 'C']) + faker.random.number({min: 100, max: 999})),

  // Personen
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName()),
  new Person(faker.name.lastName(), faker.name.firstName())
]

let r_0 = resources[0]
let r_1 = resources[1]
let r_2 = resources[2]
let r_3 = resources[3]
let r_4 = resources[4]
let r_5 = resources[5]

let room_1 = resources[6]
let room_2 = resources[7]
let room_3 = resources[8]
let room_4 = resources[9]
let room_5 = resources[10]
let room_6 = resources[11]
let room_7 = resources[12]

let person_1 = resources[13]
let person_2 = resources[14]
let person_3 = resources[15]
let person_4 = resources[16]
let person_5 = resources[17]
let person_6 = resources[18]
let person_7 = resources[19]
let person_8 = resources[20]
let person_9 = resources[21]
let person_10 = resources[22]
let person_11 = resources[23]
let person_12 = resources[24]
let person_13 = resources[25]
let person_14 = resources[26]
let person_15 = resources[26]
let person_16 = resources[27]
let person_17 = resources[28]
let person_18 = resources[29]

class Reservation {
  constructor(id, name, begin, end, lastChange, column, type, persons, resources) {
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
  }
}

const reservations = [
  // Dienstag
  new Reservation(
    '1',
    faker.commerce.productName(),
    beginWeek.clone().add(1, 'day').hour(8).minute(30),
    beginWeek.clone().add(1, 'day').hour(10).minute(30),
    lastChange,
    1,
    reservationtypes[0],
    [person_3, person_14],
    [room_7, r_5, person_3, person_14]
  ),
  new Reservation(
    '2',
    faker.commerce.productName(),
    beginWeek.clone().add(1, 'day').hour(12).minute(30),
    beginWeek.clone().add(1, 'day').hour(15).minute(45),
    lastChange,
    1,
    reservationtypes[0],
    [person_9],
    [r_5, room_1, r_3]
  ),
  // Mittwoch
  new Reservation(
    '3',
    faker.commerce.productName(),
    beginWeek.clone().add(2, 'day').hour(8).minute(30),
    beginWeek.clone().add(2, 'day').hour(11).minute(15),
    lastChange,
    1,
    reservationtypes[0],
    [person_11],
    [room_7, r_2, r_5, r_1, r_4]
  ),
  new Reservation(
    '4',
    faker.commerce.productName(),
    beginWeek.clone().add(2, 'day').hour(8).minute(30),
    beginWeek.clone().add(2, 'day').hour(11).minute(45),
    lastChange,
    2,
    reservationtypes[0],
    [person_7, person_16],
    [r_2, r_5, r_1, r_4, room_3]
  ),
  new Reservation(
    '5',
    faker.commerce.productName(),
    beginWeek.clone().add(2, 'day').hour(9).minute(30),
    beginWeek.clone().add(2, 'day').hour(12).minute(45),
    lastChange,
    3,
    reservationtypes[0],
    [person_10],
    [r_2, r_5, r_1, r_4, room_2]
  ),
  new Reservation(
    '6',
    faker.commerce.productName(),
    beginWeek.clone().add(2, 'day').hour(12).minute(30),
    beginWeek.clone().add(2, 'day').hour(15).minute(45),
    lastChange,
    1,
    reservationtypes[0],
    [person_8],
    [room_7, r_2, r_5, r_1, r_4]
  ),
  new Reservation(
    '7',
    faker.commerce.productName(),
    beginWeek.clone().add(2, 'day').hour(12).minute(30),
    beginWeek.clone().add(2, 'day').hour(15).minute(45),
    lastChange,
    2,
    reservationtypes[0],
    [person_18],
    [r_2, r_5, r_1, r_4]
  ),
  new Reservation(
    '8',
    faker.commerce.productName(),
    beginWeek.clone().add(2, 'day').hour(13).minute(30),
    beginWeek.clone().add(2, 'day').hour(16).minute(45),
    lastChange,
    3,
    reservationtypes[0],
    [person_6],
    [r_2, r_5, r_1, r_4, room_2]
  ),
  // Donnerstag
  new Reservation(
    '9',
    faker.commerce.productName(),
    beginWeek.clone().add(3, 'day').hour(8).minute(30),
    beginWeek.clone().add(3, 'day').hour(11).minute(45),
    lastChange,
    1,
    reservationtypes[0],
    [person_12],
    [room_7, r_5]
  ),
  new Reservation(
    '10',
    faker.commerce.productName(),
    beginWeek.clone().add(3, 'day').hour(12).minute(30),
    beginWeek.clone().add(3, 'day').hour(15).minute(45),
    lastChange,
    1,
    reservationtypes[0],
    [person_17],
    [room_7, r_5]
  ),
  // Freitag
  new Reservation(
    '11',
    faker.commerce.productName(),
    beginWeek.clone().add(4, 'day').hour(8).minute(30),
    beginWeek.clone().add(4, 'day').hour(11).minutes(45),
    lastChange,
    1,
    reservationtypes[0],
    [person_5],
    [r_0, r_2, r_5, r_1, r_4, room_3, r_3]
  ),
  new Reservation(
    '12',
    faker.commerce.productName(),
    beginWeek.clone().add(4, 'day').hour(8).minute(30),
    beginWeek.clone().add(4, 'day').hour(11).minutes(45),
    lastChange,
    2,
    reservationtypes[0],
    [person_2],
    [r_2, r_5, r_1, r_4, room_3, r_3]
  ),
  new Reservation(
    '14',
    faker.commerce.productName(),
    beginWeek.clone().add(4, 'day').hour(8).minute(30),
    beginWeek.clone().add(4, 'day').hour(11).minutes(45),
    lastChange,
    3,
    reservationtypes[0],
    [person_1],
    [r_2, r_5, room_4, r_1, r_4, r_3]
  ),
  new Reservation(
    '15',
    faker.commerce.productName(),
    beginWeek.clone().add(4, 'day').hour(8).minute(30),
    beginWeek.clone().add(4, 'day').hour(11).minutes(45),
    lastChange,
    4,
    reservationtypes[0],
    [person_4],
    [room_7, r_2, r_5, r_1, r_3]
  ),
  new Reservation(
    '16',
    faker.commerce.productName(),
    beginWeek.clone().add(4, 'day').hour(8).minutes(30),
    beginWeek.clone().add(4, 'day').hour(11).minutes(45),
    lastChange,
    5,
    reservationtypes[0],
    [person_13],
    [r_2, r_5, r_1, room_5, r_4, r_3]
  ),
  new Reservation(
    '17',
    faker.commerce.productName(),
    beginWeek.clone().add(4, 'day').hour(9).minutes(0),
    beginWeek.clone().add(4, 'day').hour(12).minutes(15),
    lastChange,
    6,
    reservationtypes[0],
    [person_15],
    [r_2, r_5, r_1, r_4, room_6, r_3]
  ),
  new Reservation(
    '18',
    faker.commerce.productName(),
    beginWeek.clone().add(5, 'day').hour(9).minutes(0),
    beginWeek.clone().add(5, 'day').hour(17).minutes(0),
    lastChange,
    1,
    reservationtypes[1],
    [person_6],
    [r_1, r_2, r_3, r_4, r_5]
  )
]

const demodata = {
  calendars,
  resourcetypes,
  resources,
  reservations,
  reservationtypes
}

export default demodata
