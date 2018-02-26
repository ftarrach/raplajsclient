import Attribute from './Attribute'

class DynamicType {
  constructor(id, name, attributes) {
    this.id = id
    this.name = name
    this.attributes = attributes
  }

  static fromGwt(gwtDynamicType) {
    return new DynamicType(
      gwtDynamicType.getKey(),
      gwtDynamicType.getName(),
      gwtDynamicType.getAttributes().map(Attribute.fromGwt)
    )
  }
}

export default DynamicType
