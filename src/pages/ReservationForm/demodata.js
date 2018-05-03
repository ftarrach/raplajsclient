import DateTime from '@/types/DateTime'

export default {
  id: 'ec37848c-b4ce-47f6-8328-c194499de926',
  name: 'Ich bin eine Demo Reservation',
  type: {
    id: 'ded49d87-142c-4f78-8802-d59610fb0a47',
    key: 'lecture',
    name: 'Vorlesung',
    attributes: [
      {
        id: 'afbd84c0-1c2d-4c5c-8992-7baa432f3564',
        key: 'name',
        name: 'eventname',
        type: 'STRING',
        constraints: {},
        annotations: {}
      },
      {
        id: 'a6188c36-487c-47c5-9fdc-bc9717aa5e82',
        key: 'nr',
        name: 'number',
        type: 'INT',
        constraints: {},
        annotations: {}
      },
      {
        id: 'af787e72-cb14-4a22-8709-e6b3568f923a',
        key: 'date',
        name: 'date',
        type: 'DATE',
        constraints: {},
        annotations: {}
      },
      {
        id: 'a0ff52e4-1987-4389-9d49-86b14017c985',
        key: 'bool',
        name: 'boolean',
        type: 'BOOLEAN',
        constraints: {},
        annotations: {}
      },
      {
        id: 'ab0ae5e5-d6c2-47bc-a8f9-fa4b46152e1e',
        key: 'c1',
        name: 'CategoryNullRootSingle',
        type: 'CATEGORY',
        constraints: { 'root-category': null, 'multi-select': false },
        annotations: {}
      },
      {
        id: 'aaefbbc0-ae00-4138-ab45-4e0ca4756efa',
        key: 'c2',
        name: 'CategoryNullRootMulti',
        type: 'CATEGORY',
        constraints: { 'root-category': null, 'multi-select': true },
        annotations: {}
      },
      {
        id: 'ad336602-de84-4116-8917-0e7f14c44404',
        key: 'c3',
        name: 'SpecificCategorySingle (studiengang)',
        type: 'CATEGORY',
        constraints: {
          'root-category': 'c77321ef-0c3e-428b-ba26-e63de31deb89',
          'multi-select': false
        },
        annotations: {}
      },
      {
        id: 'af54a55f-4388-46b9-bb6f-3d8da70ab1c9',
        key: 'c4',
        name: 'SpecificCategoryMulti (mathematik)',
        type: 'CATEGORY',
        constraints: {
          'root-category': 'c107a225-7a31-4472-b5e9-8abdc9b7dd50',
          'multi-select': true
        },
        annotations: {}
      },
      {
        id: 'a100e1bd-cae3-4452-a4de-2db2ae5f4fee',
        key: 'r1',
        name: 'SpecificResourceSingle (person)',
        type: 'ALLOCATABLE',
        constraints: {
          'dynamic-type': 'd6e95bbb-2a7e-43bc-914a-d333830e1ba9',
          'multi-select': false,
          belongsTo: false,
          package: false
        },
        annotations: {}
      },
      {
        id: 'ac2fe617-a131-4ff9-8c0d-3c8db7516659',
        key: 'r2',
        name: 'SpecificResourceMulti (raum)',
        type: 'ALLOCATABLE',
        constraints: {
          'dynamic-type': 'dedd79b0-e90a-44a0-904e-333a0400700a',
          'multi-select': true,
          belongsTo: false,
          package: false
        },
        annotations: {}
      },
      {
        id: 'a685ad78-76d7-4b6b-87ba-0fb3912aa6ea',
        key: 'r3',
        name: 'NullResourceSingle',
        type: 'ALLOCATABLE',
        constraints: {
          'dynamic-type': null,
          'multi-select': false,
          belongsTo: false,
          package: false
        },
        annotations: { 'edit-view': 'additional-view' }
      },
      {
        id: 'ac0c5ac8-0c76-40d3-ba32-c009e8ba9768',
        key: 'r4',
        name: 'NullResourceMulti',
        type: 'ALLOCATABLE',
        constraints: {
          'dynamic-type': null,
          'multi-select': true,
          belongsTo: false,
          package: false
        },
        annotations: { 'edit-view': 'additional-view' }
      }
    ]
  },
  classification: {
    data: {
      name: 'Bildverarbeitung (AI und MI)',
      nr: 3,
      date: null,
      bool: true,
      c1: null,
      c2: null,
      c3: null,
      c4: null,
      r1: null,
      r2: null,
      r3: null,
      r4: null
    }
  },
  allocatables: [
    {
      id: 'r23bde82-7c75-42a3-beba-41c506149868',
      name: 'F488',
      isPerson: false,
      classification: {
        type: {
          id: 'dedd79b0-e90a-44a0-904e-333a0400700a',
          key: 'room',
          name: 'Raum',
          attributes: [
            {
              id: 'a9390494-fe59-42d9-9534-3aeff0a9047b',
              key: 'name',
              name: 'name',
              type: 'STRING',
              constraints: {},
              annotations: {}
            },
            {
              id: 'a607cb4c-7426-4cbd-bb42-8121e6d5a370',
              key: 'a1',
              name: 'unterraum von',
              type: 'ALLOCATABLE',
              constraints: {
                'dynamic-type': null,
                'multi-select': false,
                belongsTo: true,
                package: false
              },
              annotations: {}
            }
          ]
        },
        data: { name: 'F488', a1: null }
      },
      createDate: new DateTime('2017-11-24', '17:14:23'),
      lastChanged: new DateTime('2018-03-09', '18:49:04'),
      lastChangedBy: []
    },
    {
      id: 'rea93226-47cb-420e-af61-a17be98279c2',
      name: 'TINF15B5',
      isPerson: false,
      classification: {
        type: {
          id: 'd14b3580-a1cd-43b3-ab84-0ec682174d23',
          key: 'course',
          name: 'Kurs',
          attributes: [
            {
              id: 'ac4dd788-2ab3-464a-8634-7528af2c29a4',
              key: 'name',
              name: 'name',
              type: 'STRING',
              constraints: {},
              annotations: {}
            },
            {
              id: 'ac63e87f-2d9a-45b8-98e6-8d6d99b40d22',
              key: 'a1',
              name: 'Studiengang',
              type: 'ALLOCATABLE',
              constraints: {
                'dynamic-type': 'd1fe1c33-ccce-49ef-a741-db852f8ff731',
                'multi-select': false,
                belongsTo: true,
                package: false
              },
              annotations: {}
            }
          ]
        },
        data: { name: 'TINF15B5', a1: 'r57c2443-ee87-44a4-b341-57d7da518f72' }
      },
      createDate: new DateTime('2017-11-24', '17:21:05'),
      lastChanged: new DateTime('2018-03-09', '18:49:11'),
      lastChangedBy: []
    },
    {
      id: 'r6c430ec-909f-46f3-9b8a-3a27ee16ad52',
      name: 'Lausen Ralph',
      isPerson: true,
      classification: {
        type: {
          id: 'd6e95bbb-2a7e-43bc-914a-d333830e1ba9',
          key: 'person',
          name: 'Person',
          attributes: [
            {
              id: 'abf77bbe-78c8-4ab4-9e41-a070d7d7e71f',
              key: 'surname',
              name: 'surname',
              type: 'STRING',
              constraints: {},
              annotations: {}
            },
            {
              id: 'a39e0164-0644-447b-8f48-be9206a18f9e',
              key: 'firstname',
              name: 'First name',
              type: 'STRING',
              constraints: {},
              annotations: {}
            },
            {
              id: 'a2be9e33-c422-45c7-a608-ace5e834299d',
              key: 'email',
              name: 'Email',
              type: 'STRING',
              constraints: {},
              annotations: {}
            }
          ]
        },
        data: { surname: 'Lausen', firstname: 'Ralph', email: '' }
      },
      createDate: new DateTime('2017-11-24', '17:16:40'),
      lastChanged: new DateTime('2017-11-24', '17:16:40'),
      lastChangedBy: []
    },
    {
      id: 'ra579156-cb79-48d1-959e-2c5771969c13',
      name: 'TINF15B1',
      isPerson: false,
      classification: {
        type: {
          id: 'd14b3580-a1cd-43b3-ab84-0ec682174d23',
          key: 'course',
          name: 'Kurs',
          attributes: [
            {
              id: 'ac4dd788-2ab3-464a-8634-7528af2c29a4',
              key: 'name',
              name: 'name',
              type: 'STRING',
              constraints: {},
              annotations: {}
            },
            {
              id: 'ac63e87f-2d9a-45b8-98e6-8d6d99b40d22',
              key: 'a1',
              name: 'Studiengang',
              type: 'ALLOCATABLE',
              constraints: {
                'dynamic-type': 'd1fe1c33-ccce-49ef-a741-db852f8ff731',
                'multi-select': false,
                belongsTo: true,
                package: false
              },
              annotations: {}
            }
          ]
        },
        data: { name: 'TINF15B1', a1: 'r57c2443-ee87-44a4-b341-57d7da518f72' }
      },
      createDate: new DateTime('2017-11-24', '17:20:29'),
      lastChanged: new DateTime('2018-03-09', '18:49:11'),
      lastChangedBy: []
    },
    {
      id: 'raf5e051-c054-4561-9ff2-9260273fac5a',
      name: 'TINF15B4',
      isPerson: false,
      classification: {
        type: {
          id: 'd14b3580-a1cd-43b3-ab84-0ec682174d23',
          key: 'course',
          name: 'Kurs',
          attributes: [
            {
              id: 'ac4dd788-2ab3-464a-8634-7528af2c29a4',
              key: 'name',
              name: 'name',
              type: 'STRING',
              constraints: {},
              annotations: {}
            },
            {
              id: 'ac63e87f-2d9a-45b8-98e6-8d6d99b40d22',
              key: 'a1',
              name: 'Studiengang',
              type: 'ALLOCATABLE',
              constraints: {
                'dynamic-type': 'd1fe1c33-ccce-49ef-a741-db852f8ff731',
                'multi-select': false,
                belongsTo: true,
                package: false
              },
              annotations: {}
            }
          ]
        },
        data: { name: 'TINF15B4', a1: 'r57c2443-ee87-44a4-b341-57d7da518f72' }
      },
      createDate: new DateTime('2017-11-24', '17:20:57'),
      lastChanged: new DateTime('2018-03-09', '18:49:11'),
      lastChangedBy: []
    },
    {
      id: 'r2ad7cf2-3345-4f54-9c11-5f2bd4a5fff1',
      name: 'TINF15B2',
      isPerson: false,
      classification: {
        type: {
          id: 'd14b3580-a1cd-43b3-ab84-0ec682174d23',
          key: 'course',
          name: 'Kurs',
          attributes: [
            {
              id: 'ac4dd788-2ab3-464a-8634-7528af2c29a4',
              key: 'name',
              name: 'name',
              type: 'STRING',
              constraints: {},
              annotations: {}
            },
            {
              id: 'ac63e87f-2d9a-45b8-98e6-8d6d99b40d22',
              key: 'a1',
              name: 'Studiengang',
              type: 'ALLOCATABLE',
              constraints: {
                'dynamic-type': 'd1fe1c33-ccce-49ef-a741-db852f8ff731',
                'multi-select': false,
                belongsTo: true,
                package: false
              },
              annotations: {}
            }
          ]
        },
        data: { name: 'TINF15B2', a1: 'r57c2443-ee87-44a4-b341-57d7da518f72' }
      },
      createDate: new DateTime('2017-11-24', '17:20:40'),
      lastChanged: new DateTime('2018-03-09', '18:49:11'),
      lastChangedBy: []
    }
  ],
  appointments: [
    {
      id: 'a24c6b1d-e16e-43ce-bbba-10a9e6feb92f',
      start: new DateTime('2017-10-04', '08:30:00'),
      end: new DateTime('2017-10-04', '11:45:00'),
      maxEnd: null,
      repeating: {
        type: 'weekly',
        interval: 1,
        end: null,
        number: -1,
        weekdays: [3],
        exceptions: []
      },
      isWholeDay: false,
      reservationId: 'ec37848c-b4ce-47f6-8328-c194499de926',
      allocatables: [
        'r23bde82-7c75-42a3-beba-41c506149868',
        'rea93226-47cb-420e-af61-a17be98279c2',
        'r6c430ec-909f-46f3-9b8a-3a27ee16ad52',
        'ra579156-cb79-48d1-959e-2c5771969c13',
        'raf5e051-c054-4561-9ff2-9260273fac5a',
        'r2ad7cf2-3345-4f54-9c11-5f2bd4a5fff1'
      ]
    }
  ],
  permissions: [],
  createDate: new DateTime('2017-11-24', '17:41:55'),
  lastChange: new DateTime('2018-04-20', '20:10:29'),
  firstDate: new DateTime('2017-10-04', '08:30:00')
}
