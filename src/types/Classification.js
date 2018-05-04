import DateTime from './DateTime'
import DynamicType from './DynamicType'

const parseGwtAttributeValue = function(gwtClassification, gwtAttribute) {
  const type = gwtAttribute.getType().name()
  if (type === 'ALLOCATABLE' || type === 'CATEGORY') {
    return api.toArray(gwtClassification.getValues(gwtAttribute)).map(v => v.getId())
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
    api.error(`${JSON.stringify(value)} ${type}`)
  }
  return value
}

class Classification {
  constructor(data, type) {
    this.data = data // Allocatable.key => value
    this.type = type
  }

  static fromGwt(gwtClassification) {
    return new Classification(
      gwtClassification
        .getAttributes()
        .reduce(
          (acc, a) =>
            Object.assign(acc, {
              [a.getKey()]: parseGwtAttributeValue(gwtClassification, a)
            }),
          {}
        ),
      DynamicType.fromGwt(gwtClassification.getType())
    )
  }
}

export default Classification
