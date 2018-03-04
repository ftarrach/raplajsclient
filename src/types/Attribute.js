/* global api */

import Category from '@/types/Category'
import DynamicType from '@/types/DynamicType'

class Attribute {
  constructor(id, key, name, type, constraints) {
    this.id = id
    this.key = key
    this.name = name
    this.type = type
    this.constraints = constraints
  }

  static fromGwt(gwtAttribute) {
    return new Attribute(
      gwtAttribute.getId(),
      gwtAttribute.getKey(),
      gwtAttribute.getName(),
      gwtAttribute.getType().name(),
      gwtAttribute.getConstraintKeys().reduce((acc, key) =>
        Object.assign(acc, { [key]: parseConstraint(key, gwtAttribute.getConstraint(key), gwtAttribute) }), {}
      )
    )
  }
}

function parseConstraint(key, constraint, gwtAttr) {
  if (typeof constraint === typeof true) { // https://stackoverflow.com/a/28814615
    return constraint
  }
  if (api.isCategory(constraint)) {
    return Category.fromGwt(constraint)
  }
  if (key === 'dynamic-type') {
    if (constraint === null) {
      return null
    } else if (api.isDynamicType(constraint)) {
      return DynamicType.fromGwt(constraint)
    }
  } else if (key === 'root-category') {
    if (constraint === null) {
      return null
    } else if (api.isCategory(constraint)) {
      return Category.fromGwt(constraint)
    }
  }
  console.error(`unknown type for constraint ${gwtAttr.getName()}->${key} found. Value is: (see next line)`)
  console.errror(constraint)
  console.error(`${key} ${gwtAttr.getName()}`)
  return null
}

export default Attribute
