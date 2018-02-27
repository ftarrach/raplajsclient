import Classification from './Classification'
import DateTime from './util/DateTime'

class Allocatable {
  constructor(id, classification, createDate = null, lastChanged = null, lastChangedBy = null, permissions = []) {
    this.id = id
    this.classification = classification
    this.createDate = createDate
    this.lastChanged = lastChanged
    this.lastChangedBy = lastChangedBy
    this.permissions = permissions
  }

  static fromGwt(gwtAllocatable) {
    return new Allocatable(
      gwtAllocatable.getId(),
      Classification.fromGwt(gwtAllocatable.getClassification()),
      DateTime.fromGwtDate(gwtAllocatable.getCreateDate()),
      DateTime.fromGwtDate(gwtAllocatable.getLastChange()),
      [ /* TODO: permissions */ ]
    )
  }
}

export default Allocatable
