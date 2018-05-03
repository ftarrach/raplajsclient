const MS_PER_DAY = 60 * 60 * 24 * 1000

/**
 * @param {Appointment}
 * @returns {String} forever, n-times, end-date
 */
function getRepeatEndtype(appointment) {
  if (appointment.repeating.end === null && appointment.repeating.number === -1) {
    return 'forever'
  } else if (appointment.repeating.number !== null) {
    return 'n-times'
  } else {
    return 'end-date'
  }
}

/**
 * @param {String} iso8601Date, example: 2018-12-31
 * @param {Number} days, days to add
 * @returns {String} iso8601Date, example: 2019-01-01
 */
function addDays(iso8601Date, days) {
  const date = new Date(iso8601Date)
  return new Date(date.setTime(date.getTime() + days * MS_PER_DAY)).toISOString().slice(0, 10)
}

export { addDays, getRepeatEndtype }
