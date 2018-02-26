import moment from 'moment'
import faker from 'faker'

import Allocatable from '@/types/Allocatable'
import Attribute from '@/types/Attribute'
import Classification from '@/types/Classification'
import DynamicType from '@/types/DynamicType'

faker.locale = 'de'
moment.locale('de')

const beginWeek = moment('20171002T0000')
const lastChange = moment('20171231T1422').toObject()

const calendars = [
  'Default',
  'Testkalender'
]

const types = [
  new DynamicType(1, 'Raum', [ new Attribute('a1', 'name', 'STRING') ]),
  new DynamicType(2, 'Kurse', [ new Attribute('a1', 'name', 'STRING') ]),
  new DynamicType(3, 'Person', [ new Attribute('a1', 'name', 'STRING'), new Attribute('a2', 'hasComputer', 'BOOLEAN') ])
]

const allocatables = [
  new Allocatable(1, 'TINF15B1', new Classification(types[0]))
]

const demodata = {
  calendars,
  resourcetypes: [],
  resources: [],
  reservations: [],
  reservationtypes: []
}

export default demodata
