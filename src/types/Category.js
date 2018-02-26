
class Category {
  constructor(id, key, name, subcategories = []) {
    this.id = id
    this.key = key
    this.name = name
    this.subcategories = subcategories
  }
}

export default Category
