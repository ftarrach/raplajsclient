import Classification from './Classification'
import DateTime from './DateTime'

class Allocatable {
  constructor(id, name, isPerson, classification, createDate, lastChanged, lastChangedBy, permissions) {
    this.id = id
    this.name = name
    this.isPerson = isPerson
    this.classification = classification
    this.createDate = createDate
    this.lastChanged = lastChanged
    this.lastChangedBy = lastChangedBy
    this.permissions = permissions
  }

  static fromGwt(gwtAllocatable) {
    return new Allocatable(
      gwtAllocatable.getId(),
      gwtAllocatable.getName(),
      gwtAllocatable.isPerson(),
      Classification.fromGwt(gwtAllocatable.getClassification()),
      DateTime.createFromGwtDate(gwtAllocatable.getCreateDate()),
      DateTime.createFromGwtDate(gwtAllocatable.getLastChanged()),
      [ /* TODO: permissions */ ]
    )
  }
}

export default Allocatable
