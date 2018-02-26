
class Attribute {

  constructor(id, key, name, type) {
    this.id = id
    this.key = key
    this.name = name
    this.type = type
  }

  static fromGwt(gwtAttribute) {
    return new Attribute(
      gwtAttribute.getId(),
      gwtAttribute.getKey(),
      gwtAttribute.getName(),
      gwtAttribute.getType().name()
    )
  }
}

export default Attribute
