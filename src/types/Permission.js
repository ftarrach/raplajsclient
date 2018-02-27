
class Permission {
  constructor(user, accessLevel, category, minAdvance, maxAdvance, start, end) {
    this.user = user
    this.accessLevel = accessLevel
    this.category = category
    this.minAdvance = minAdvance
    this.maxAdvance = maxAdvance
    this.start = start
    this.end = end
  }
}

export default Permission
