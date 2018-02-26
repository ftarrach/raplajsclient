import moment from 'moment'
import faker from 'faker'

import Allocatable from '@/types/Allocatable'
import Attribute from '@/types/Attribute'
import Category from '@/types/Category'
import Classification from '@/types/Classification'
import DynamicType from '@/types/DynamicType'
import Reservation from '@/types/Reservation'
import Appointment from '@/types/Appointment'
import Repeating from '@/types/Repeating'

import DateTime from '@/types/util/DateTime'

faker.locale = 'de'
moment.locale('de')

const beginWeek = moment('20171002T0000')
const lastChange = moment('20171231T1422').toObject()

const calendars = [
  'Default',
  'Testkalender'
]

const categories = [
  new Category('cat1', 'c1', 'Studiengang', [
    new Category('cat2', 'c2', 'Informatik'),
    new Category('cat2', 'c2', 'Mathematik')
  ])
]

const types = [
  new DynamicType('dt1', 'Raum', [ new Attribute('a1', 'name', 'name', 'STRING') ]),
  new DynamicType('dt2', 'Kurse', [ new Attribute('a2', 'name', 'name', 'STRING') ]),

  new DynamicType('dt3', 'Person', [
    new Attribute('attr3', 'surname', 'surname', 'STRING'),
    new Attribute('attr4', 'firstname', 'First name', 'STRING'),
    new Attribute('attr5', 'email', 'Email', 'STRING')
  ]),

  new DynamicType('dt4', 'Vorlesung', [
    new Attribute('attr6', 'name', 'eventname', 'STRING'),
    new Attribute('attr7', 'a1', 'Studiengang', 'CATEGORY')
  ])
]

const allocatables = [
  new Allocatable('allo1', new Classification(types[0], { 'name': 'TINF15B1' })),
  new Allocatable('allo2', new Classification(types[0], { 'name': 'TINF15B2' })),
  new Allocatable('allo3', new Classification(types[0], { 'name': 'TINF15B3' })),
  new Allocatable('allo4', new Classification(types[0], { 'name': 'TINF15B4' })),
  new Allocatable('allo5', new Classification(types[0], { 'name': 'TINF15B5' })),
  new Allocatable('allo6', new Classification(types[1], { 'name': 'A100' })),
  new Allocatable('allo6', new Classification(types[1], { 'name': 'A101' })),
  new Allocatable('allo6', new Classification(types[1], { 'name': 'A102' })),
  new Allocatable('allo6', new Classification(types[1], { 'name': 'A103' })),
  new Allocatable('allo7', new Classification(types[2], { 'surname': 'Mustermann', 'firstname': 'Manfred', 'email': 'm.mustermann@provider.com' })),
  new Allocatable('allo7', new Classification(types[2], { 'surname': 'Musterfrau', 'firstname': 'Erika', 'email': 'e.musterfrau@provider.com' }))
]

const reservations = [
  new Reservation('res1',
    new Classification(types[2], { 'name': 'Mathematik I', 'a1': categories[0][1] },
    [ allocatables.filter(a => ['allo5', 'allo6', 'allo7'].includes(a.id)) ],
      [ new Appointment('app1',
          DateTime.fromMoment(beginWeek.clone().hour(9)),
          DateTime.fromMoment(beginWeek.clone().hour(11)),
          null,
          new Repeating('WEEKLY', 1, null, -1, []),
          false) ],
    [ /* permissions */ ]
  ))
]

const demodata = {
  calendars,
  resourcetypes: [],
  resources: [],
  reservations: [],
  reservationtypes: []
}

export default demodata
