import DateTime from './DateTime'

class Repeating {
  constructor(type, interval, end, number, weekdays, exceptions) {
    this.type = type // enum RepeatingType { DAILY, WEEKLY, MONTHLY, YEARLY }
    this.interval = interval // interval between repeatings (days or weeks)
    this.end = end // if null => forever
    this.number = number // if -1 and end === null => forever
    this.weekdays = weekdays
    this.exceptions = exceptions // array of dates
  }

  static fromGwt(gwtRepeating) {
    if (!gwtRepeating) {
      return null
    }
    let exceptions = gwtRepeating.getExceptions()
    if (exceptions.length > 0) {
      exceptions = exceptions.map(e =>
        DateTime.createFromGwtDate(e)
      )
    }
    return new Repeating(
      gwtRepeating.getType().toString(),
      gwtRepeating.getInterval(),
      DateTime.createFromGwtDate(gwtRepeating.getEnd()),
      gwtRepeating.getNumber(),
      window.api.toArray(gwtRepeating.getWeekdays()).map(w => w.toString()),
      exceptions
    )
  }
}

export default Repeating
