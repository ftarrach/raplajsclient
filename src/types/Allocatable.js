
class Allocatable {
  constructor(id, classification, createDate = null, lastChanged = null, lastChangedBy = null, permissions = []) {
    this.id = id
    this.classification = classification
    this.createDate = createDate
    this.lastChanged = lastChanged
    this.lastChangedBy = lastChangedBy
    this.permissions = permissions
  }
}

export default Allocatable
