const resources = [
  {
    title: 'Kurs',
    group: 'course',
    items: [
      { id: 'K1', title: 'TINF15B1' },
      { id: 'K2', title: 'TINF15B2' },
      { id: 'K3', title: 'TINF15B3' },
      { id: 'K4', title: 'TINF15B4' },
      { id: 'K5', title: 'TINF15B5' }
    ]
  },
  {
    title: 'Studiengang',
    group: 'resource',
    items: [
      {
        title: 'Informatik',
        group: 'resource-Informatik',
        items: [
          { id: 'K1', title: 'TINF15B1' },
          { id: 'K2', title: 'TINF15B2' },
          { id: 'K3', title: 'TINF15B3' },
          { id: 'K4', title: 'TINF15B4' },
          { id: 'K5', title: 'TINF15B5' }
        ]
      },
      {
        id: 'Tech',
        title: 'Technik',
        group: 'resource-Technik'
      }
    ]
  },
  {
    title: 'Raum',
    group: 'room',
    items: [
      { id: 'a266', title: 'A266' },
      {
        id: 'audi',
        title: 'Audimax',
        group: 'room-Audimax',
        items: [
          {
            id: 'audi-li',
            title: 'Audimax links',
            group: 'room-Audimax-Audimax_links',
            items: [{ id: 'audi-li-vo', title: 'Audimax links vorne' }]
          },
          {
            id: 'audi-re',
            title: 'Audimax rechts'
          }
        ]
      },
      {
        id: 'audi-li',
        title: 'Audimax links',
        group: 'room-Audimax_links',
        items: [{ id: 'audi-li-vo', title: 'Audimax links vorne' }]
      },
      { id: 'audi-li-vo', title: 'Audimax links vorne' },
      { id: 'audi-re', title: 'Audimax rechts' },
      { id: 'c236', title: 'C236' },
      { id: 'e208', title: 'E208' },
      { id: 'e210', title: 'E210' },
      { id: 'e305', title: 'E305' },
      { id: 'e313', title: 'E313' },
      { id: 'e488', title: 'E488' }
    ]
  },
  {
    title: 'Person',
    group: 'person',
    items: [
      { id: 'p1', title: 'Berkling Kay Margarethe' },
      { id: 'p2', title: 'Braun Heinrich' },
      { id: 'p3', title: 'Briem Lars' },
      { id: 'p4', title: 'Duve Greta' },
      { id: 'p5', title: 'Eneekiel Achim' },
      { id: 'p6', title: 'Freudenmann Johannes' },
      { id: 'p7', title: 'Hefke Mark' },
      { id: 'p8', title: 'Hopp Torsten' },
      { id: 'p9', title: 'Kampermann Joachim' },
      { id: 'p10', title: 'Keller Sina' },
      { id: 'p11', title: 'Lausen Ralph' },
      { id: 'p12', title: 'May Frank' },
      { id: 'p13', title: 'Mohammadi Aydin Mir' },
      { id: 'p14', title: 'Müller Maurice' },
      { id: 'p15', title: 'Strand Marcus' },
      { id: 'p16', title: 'Trunko Ralf' },
      { id: 'p17', title: 'Tröller Claudia' },
      { id: 'p18', title: 'Vetter Michael' }
    ]
  }
]

const views = [
  { id: 'table_events', label: 'Veranstaltungen' },
  { id: 'table_appointments', label: 'Reservierungen' },
  { id: 'day', label: 'Tag' },
  { id: 'week', label: 'Woche' },
  { id: 'month', label: 'Month' }
]

const calendars = [
  { id: null, label: 'Default' },
  { id: 'Kurse', label: 'Kurse' }
]

const conflicts = [
  {
    title: 'Konflikte',
    items: [
      {
        title: 'Testkonflikt'
      }
    ]
  }
]

export default {
  resources,
  views,
  calendars,
  conflicts
}
