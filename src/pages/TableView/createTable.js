import Locale from '@/locale'
import DateTime from '@/types/DateTime'

const createTable = () => {
  if (window.api) {
    if (window.api.calendarModel.getViewId() === 'table_appointments') {
      return new Promise((resolve, reject) => {
         // FIXME: Delete this Promise if pagination is implemented
        reject(new Error('rejected because gwt will return too much data as of right now'))
      })
    }
    return new Promise((resolve, reject) => {
      window.api
        .loadTableModel(window.api.calendarModel)
        .thenAccept(table => resolve(mapTable(table)))
        .exceptionally(reject)
    })
  } else {
    // DEBUG: demodata
    return new Promise(resolve => {
      resolve({
        columns: [
          { name: 'Name', type: 'STRING' },
          { name: 'Beginn', type: 'DATE' },
          { name: 'zuletzt geändert am', type: 'DATE' }
        ],
        rows: [
          {
            id: 'ec37848c-b4ce-47f6-8328-c194499de926',
            data: [
              'Bildverarbeitung (AI und MI)',
              'Mi. 04.10.2017 08:30',
              'Sa. 10.03.2018 14:20'
            ]
          },
          {
            id: 'ed552e1f-2a2b-4a6c-85b6-0f64461592ea',
            data: ['e Business', 'Mi. 04.10.2017 08:30', 'Mi. 03.01.2018 17:39']
          }
        ],
        gwtObjects: []
      })
    })
  }
}

const mapTable = table => {
  const columns = table.getColumns().map(mapColumn)
  const rows = table.getAllRows().map((row, index) => {
    let n = Array(table.getColumnCount())
    row.forEach((val, c) => {
      if (columns[c].type === 'DATE') {
        n[c] = Locale.formatDateTime(
          DateTime.createFromGwtDate(val)
        )
      } else {
        n[c] = val
      }
    })
    return {
      id: table.getObjectAt(index).getId(),
      data: n
    }
  })
  const gwtObjects = [...Array(table.getRowCount()).keys()].map(i =>
    table.getObjectAt(i)
  )
  return { columns, rows, gwtObjects }
}

const mapColumn = c => ({
  name: c.getColumnName(),
  type: c.getType().name()
})

export default createTable
