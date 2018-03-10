
class Attribute {
  constructor(id, key, name, type, constraints, annotations) {
    this.id = id
    this.key = key
    this.name = name
    this.type = type
    this.constraints = constraints
    this.annotations = annotations
  }

  static fromGwt(gwtAttribute) {
    return new Attribute(
      gwtAttribute.getId(),
      gwtAttribute.getKey(),
      gwtAttribute.getName(),
      gwtAttribute.getType().name(),
      gwtAttribute.getConstraintKeys().reduce((acc, key) =>
        Object.assign(acc, { [key]: parseConstraint(key, gwtAttribute.getConstraint(key), gwtAttribute) }), {}
      ),
      gwtAttribute.getAnnotationKeys().reduce((acc, key) =>
        Object.assign(acc, { [key]: gwtAttribute.getAnnotation(key) }), {}
      )
    )
  }
}

function parseConstraint(key, constraint, gwtAttr) {
  if (!constraint) {
    return constraint
  }
  if (typeof constraint === typeof true) { // https://stackoverflow.com/a/28814615
    return constraint
  }
  if (constraint.getId) {
    return constraint.getId()
  }
  console.error(`unknown type for constraint ${gwtAttr.getName()}->${key} found. Value is: (see next line)`)
  console.errror(constraint)
  console.error(`${key} ${gwtAttr.getName()}`)
  return null
}

export default Attribute
