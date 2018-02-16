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

const reservations = [
  // Dienstag
  {
    id: '1',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(1, 'day').hour(8).minute(30),
    end: beginWeek.clone().add(1, 'day').hour(10).minute(30),
    lastChange: lastChange,
    type: reservationtypes[0],
    persons: [person_3, person_14],
    resources: [
      room_7,
      r_5,
      person_3,
      person_14
    ]
  },
  {
    id: '2',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(1, 'day').hour(12).minute(30),
    end: beginWeek.clone().add(1, 'day').hour(15).minute(45),
    lastChange: lastChange,
    type: reservationtypes[0],
    persons: [
      person_9
    ],
    resources: [
      r_5,
      room_1,
      r_3
    ]
  },
  // Mittwoch
  {
    id: '3',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(2, 'day').hour(8).minute(30),
    end: beginWeek.clone().add(2, 'day').hour(11).minute(15),
    lastChange: lastChange,
    column: 1,
    type: reservationtypes[0],
    persons: [
      person_11
    ],
    resources: [
      room_7,
      r_2,
      r_5,
      r_1,
      r_4
    ]
  },
  {
    id: '4',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(2, 'day').hour(8).minute(30),
    end: beginWeek.clone().add(2, 'day').hour(11).minute(45),
    lastChange: lastChange,
    column: 2,
    type: reservationtypes[0],
    persons: [
      person_7,
      person_16
    ],
    resources: [
      r_2,
      r_5,
      r_1,
      r_4,
      room_3
    ]
  },
  {
    id: '5',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(2, 'day').hour(9).minute(30),
    end: beginWeek.clone().add(2, 'day').hour(12).minute(45),
    lastChange: lastChange,
    column: 3,
    type: reservationtypes[0],
    persons: [
      person_10
    ],
    resources: [
      r_2,
      r_5,
      r_1,
      r_4,
      room_2
    ]
  },
  {
    id: '6',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(2, 'day').hour(12).minute(30),
    end: beginWeek.clone().add(2, 'day').hour(15).minute(45),
    lastChange: lastChange,
    column: 1,
    type: reservationtypes[0],
    persons: [
      person_8
    ],
    resources: [
      room_7,
      r_2,
      r_5,
      r_1,
      r_4
    ]
  },
  {
    id: '7',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(2, 'day').hour(12).minute(30),
    end: beginWeek.clone().add(2, 'day').hour(15).minute(45),
    lastChange: lastChange,
    column: 2,
    type: reservationtypes[0],
    persons: [
      person_18
    ],
    resources: [
      r_2,
      r_5,
      r_1,
      r_4
    ]
  },
  {
    id: '8',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(2, 'day').hour(13).minute(30),
    end: beginWeek.clone().add(2, 'day').hour(16).minute(45),
    lastChange: lastChange,
    column: 3,
    type: reservationtypes[0],
    persons: [
      person_6
    ],
    resources: [
      r_2,
      r_5,
      r_1,
      r_4,
      room_2
    ]
  },
  // Donnerstag
  {
    id: '9',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(3, 'day').hour(8).minute(30),
    end: beginWeek.clone().add(3, 'day').hour(11).minute(45),
    lastChange: lastChange,
    type: reservationtypes[0],
    persons: [
      person_12
    ],
    resources: [
      room_7,
      r_5
    ]
  },
  {
    id: '10',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(3, 'day').hour(12).minute(30),
    end: beginWeek.clone().add(3, 'day').hour(15).minute(45),
    lastChange: lastChange,
    type: reservationtypes[0],
    persons: [
      person_17
    ],
    resources: [
      room_7,
      r_5
    ]
  },
  // Freitag
  {
    id: '11',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(4, 'day').hour(8).minute(30),
    end: beginWeek.clone().add(4, 'day').hour(11).minutes(45),
    lastChange: lastChange,
    column: 1,
    type: reservationtypes[0],
    persons: [
      person_5
    ],
    resources: [
      r_0,
      r_2,
      r_5,
      r_1,
      r_4,
      room_3,
      r_3
    ]
  },
  {
    id: '12',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(4, 'day').hour(8).minute(30),
    end: beginWeek.clone().add(4, 'day').hour(11).minutes(45),
    lastChange: lastChange,
    column: 2,
    type: reservationtypes[0],
    persons: [
      person_2
    ],
    resources: [
      r_2,
      r_5,
      r_1,
      r_4,
      room_3,
      r_3
    ]
  },
  {
    id: '14',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(4, 'day').hour(8).minute(30),
    end: beginWeek.clone().add(4, 'day').hour(11).minutes(45),
    lastChange: lastChange,
    column: 3,
    type: reservationtypes[0],
    persons: [
      person_1
    ],
    resources: [
      r_2,
      r_5,
      room_4,
      r_1,
      r_4,
      r_3
    ]
  },
  {
    id: '15',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(4, 'day').hour(8).minute(30),
    end: beginWeek.clone().add(4, 'day').hour(11).minutes(45),
    lastChange: lastChange,
    column: 4,
    type: reservationtypes[0],
    persons: [
      person_4
    ],
    resources: [
      room_7,
      r_2,
      r_5,
      r_1,
      r_3
    ]
  },
  {
    id: '16',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(4, 'day').hour(8).minutes(30),
    end: beginWeek.clone().add(4, 'day').hour(11).minutes(45),
    lastChange: lastChange,
    column: 5,
    type: reservationtypes[0],
    persons: [
      person_13
    ],
    resources: [
      r_2,
      r_5,
      r_1,
      room_5,
      r_4,
      r_3
    ]
  },
  {
    id: '17',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(4, 'day').hour(9).minutes(0),
    end: beginWeek.clone().add(4, 'day').hour(12).minutes(15),
    lastChange: lastChange,
    column: 6,
    type: reservationtypes[0],
    persons: [
      person_15
    ],
    resources: [
      r_2,
      r_5,
      r_1,
      r_4,
      room_6,
      r_3
    ]
  },
  {
    id: '18',
    name: faker.commerce.productName(),
    begin: beginWeek.clone().add(5, 'day').hour(9).minutes(0),
    end: beginWeek.clone().add(5, 'day').hour(17).minutes(0),
    lastChange: lastChange,
    type: reservationtypes[1],
    persons: [
      person_6
    ],
    resources: [
      r_1,
      r_2,
      r_3,
      r_4,
      r_5
    ]
  }
]

const demodata = {
  calendars,
  resourcetypes,
  resources,
  reservations,
  reservationtypes
}

export default demodata
