import DateTime from './DateTime'

const parseGwtAttributeValue = function(gwtClassification, gwtAttribute) {
  const type = gwtAttribute.getType().name()
  if (type === 'ALLOCATABLE' || type === 'CATEGORY') {
    return window.api.toArray(gwtClassification.getValues(gwtAttribute)).map(v => v.getId())
  }
  const value = gwtClassification.getValueForAttribute(gwtAttribute)
  if (value) {
    if (type === 'INT') {
      return parseInt(value.toString())
    } else if (type === 'STRING') {
      return value.toString()
    } else if (type === 'DATE') {
      return DateTime.createFromGwtDate(value)
    } else if (type === 'BOOLEAN') {
      return value.toString() === 'true'
    }
    window.api.error(`${JSON.stringify(value)} ${type}`)
  }
  return value
}

class Classification {
  constructor(GWT, data) {
    this.GWT = GWT
    this.data = data // Allocatable.key => value
  }

  static fromGwt(gwtClassification) {
    return new Classification(
      gwtClassification,
      gwtClassification
        .getAttributes()
        .reduce(
          (acc, a) =>
            Object.assign(acc, {
              [a.getKey()]: parseGwtAttributeValue(gwtClassification, a)
            }),
          {}
        )
    )
  }
}

export default Classification
