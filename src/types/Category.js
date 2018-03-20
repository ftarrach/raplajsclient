
class Category {
  constructor(id, key, name, subcategories = []) {
    this.id = id
    this.key = key
    this.name = name
    this.subcategories = subcategories
  }

  static fromGwt({ getId, getKey, getName, getCategories }) {
    return new Category(
      getId(),
      getKey(),
      getName(),
      getCategories().map(c => Category.fromGwt(c))
    )
  }
}

export default Category

export function toDrilldownItem(c) {
  if (c.subcategories.length === 0) {
    return { id: c.id, label: c.name }
  } else {
    return { id: c.id, label: c.name, children: c.subcategories.map(toDrilldownItem) }
  }
}
