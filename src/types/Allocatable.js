import Classification from './Classification'
import DateTime from './util/DateTime'

class Allocatable {
  constructor(id, name, isPerson, classification, createDate = null, lastChanged = null, lastChangedBy = null, permissions = []) {
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
      DateTime.fromGwtDate(gwtAllocatable.getCreateDate()),
      DateTime.fromGwtDate(gwtAllocatable.getLastChanged()),
      [ /* TODO: permissions */ ]
    )
  }
}

export default Allocatable

export function toDrilldownItem(a) {
  return {
    id: a.id,
    label: a.name
  }
}
