import DateTime from '@/types/DateTime'

const appointments = [
  {
    id: 1,
    start: new DateTime('2018-01-01', '8:30:00'),
    end: new DateTime('2018-01-01', '11:30:00'),
    column: 0,
    lines: [
      { text: '8:30 - 11:30' },
      { text: 'Advanced SWE', style: 'bold' },
      { text: 'Briem Lars', style: 'italic' },
      { text: 'Müller Maurice', style: 'italic' },
      { text: 'F488' },
      { text: 'TINF15B5' }
    ]
  },
  {
    id: 2,
    start: new DateTime('2018-01-02', '8:30:00'),
    end: new DateTime('2018-01-02', '11:30:00'),
    column: 0,
    lines: [
      { text: '8:30 - 11:30' },
      { text: 'Bildverarbeitung (AI und MI)', style: 'bold' },
      { text: 'Lausen Ralph', style: 'italic' },
      { text: 'TINF15B1' },
      { text: 'TINF15B2' },
      { text: 'TINF15B3' },
      { text: 'TINF15B4' },
      { text: 'TINF15B5' },
      { text: 'F488' }
    ]
  },
  {
    id: 3,
    start: new DateTime('2018-01-02', '8:30:00'),
    end: new DateTime('2018-01-02', '11:30:00'),
    column: 1,
    lines: [
      { text: '8:30 - 11:30' },
      { text: 'eBusiness', style: 'bold' },
      { text: 'Trunko Ralf', style: 'italic' },
      { text: 'Hefke Mark', style: 'italic' },
      { text: 'TINF15B1' },
      { text: 'TINF15B2' },
      { text: 'TINF15B3' },
      { text: 'TINF15B4' },
      { text: 'TINF15B5' },
      { text: 'E208' }
    ]
  },
  {
    id: 4,
    start: new DateTime('2018-01-02', '9:30:00'),
    end: new DateTime('2018-01-02', '12:30:00'),
    column: 2,
    lines: [
      { text: '9:30 - 12:30' },
      { text: 'Wissensbasierte Systeme', style: 'bold' },
      { text: 'Keller Sina', style: 'italic' },
      { text: 'TINF15B1' },
      { text: 'TINF15B2' },
      { text: 'TINF15B3' },
      { text: 'TINF15B4' },
      { text: 'TINF15B5' },
      { text: 'C236' }
    ]
  },
  {
    id: 5,
    start: new DateTime('2018-01-03', '8:30:00'),
    end: new DateTime('2018-01-03', '11:45:00'),
    column: 0,
    lines: [
      { text: '8:30 - 11:45' },
      { text: 'DB II Implementierungen', style: 'bold' },
      { text: 'Frank May', style: 'italic' },
      { text: 'TINF15B5' },
      { text: 'F488' }
    ]
  }
]

const days = [
  DateTime.createFromJsDate(new Date('2018-01-01')),
  DateTime.createFromJsDate(new Date('2018-01-02')),
  DateTime.createFromJsDate(new Date('2018-01-03')),
  DateTime.createFromJsDate(new Date('2018-01-04')),
  DateTime.createFromJsDate(new Date('2018-01-05'))
]

export default {
  appointments,
  days
}
