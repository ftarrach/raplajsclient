import Attribute from './Attribute'

class DynamicType {
  constructor(id, key, name, attributes) {
    this.id = id
    this.key = key
    this.name = name
    this.attributes = attributes
  }

  static fromGwt(gwtDynamicType) {
    return new DynamicType(
      gwtDynamicType.getId(),
      gwtDynamicType.getKey(),
      gwtDynamicType.getName(),
      gwtDynamicType.getAttributes().map(Attribute.fromGwt)
    )
  }
}

export default DynamicType

window.DynamicType = DynamicType
