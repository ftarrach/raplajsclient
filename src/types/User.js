import Category from './Category'

class User {
  constructor(username, name, email, isAdmin, groups) {
    this.username = username
    this.name = name
    this.email = email
    this.isAdmin = isAdmin
    this.groups = groups // = Array of
  }

  static fromGwt(gwtUser) {
    return new User(
      gwtUser.getUsername(),
      gwtUser.getName_(),
      gwtUser.getEmail(),
      gwtUser.isAdmin(),
      gwtUser.getGroups().map(Category.fromGwt)
    )
  }
}

export default User

window.User = User
