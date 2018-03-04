import DynamicType from './DynamicType'

let parseGwtAttributeValue = function(gwtClassification, gwtAttribute) {
  let type = gwtAttribute.getType().name()
  let value = gwtClassification.getValue(gwtAttribute.getKey())
  if (value) {
    if (['CATEGORY', 'ALLOCATABLE'].includes(type)) {
      // TODO: support arrays
      return value.getId()
    } else if (type === 'NUMBER') {
      return parseInt(value)
    }
  }
  return value
}

class Classification {
  constructor(type, data) {
    this.type = type
    this.data = data // Allocatable.key => value
  }

  static fromGwt(gwtClassification) {
    return new Classification(
      DynamicType.fromGwt(gwtClassification.getType()),
      gwtClassification
        .getAttributes()
        .reduce((acc, a) =>
          Object.assign(
            acc,
            { [a.getKey()]: parseGwtAttributeValue(gwtClassification, a) }
          ), {})
    )
  }
}

export default Classification
