import DateTime from './util/DateTime'

class Repeating {
  constructor(type, interval, end, number, exceptions) {
    this.type = type // enum RepeatingTYPE { DAILY, WEEKLY, MONTHLY, YEARLY }
    this.interval = interval // interval between repeatings (days or weeks)
    this.end = end // if null => forever
    this.number = number // if -1 and end === null => forever
    this.exceptions = exceptions // array of dates
  }

  static fromGwt(gwtRepeating) {
    if (gwtRepeating === null) {
      // single appointment, no repeating
      return null
    }
    let exceptions = gwtRepeating.getExceptions()
    if (exceptions.length > 0) {
      exceptions = exceptions.map(e => DateTime.fromGwtDate(e))
    }
    return new Repeating(
      gwtRepeating.getType().name(),
      gwtRepeating.getInterval(),
      DateTime.fromGwtDate(gwtRepeating.getEnd()),
      gwtRepeating.getNumber(),
      exceptions
    )
  }
}

export default Repeating
