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
  if (api.isDynamicType(constraint)) {
    return DynamicType.fromGwt(constraint)
  }
  console.error(`unknown type for constraint ${key} found. Value is:`)
  console.error(constraint)
  let classname = api.getClassname(constraint)
  console.log(`${key} ${gwtAttr.getName()} ${classname}`)
  console.log(constraint)
  return null
}

window.Attribute = Attribute

export default Attribute
