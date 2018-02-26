
class Allocatable {
  constructor(id, name, classification, createDate = null, lastChanged = null, lastChangedBy = null, permissions = []) {
    this.id = id
    this.name = name
    this.classification = classification
    this.createDate = createDate
    this.lastChanged = lastChanged
    this.lastChangedBy = lastChangedBy
    this.permissions = permissions
  }
}