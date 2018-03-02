
class Category {
  constructor(id, key, name, subcategories = []) {
    this.id = id
    this.key = key
    this.name = name
    this.subcategories = subcategories
  }

  static fromGwt(gwtCategory) {
    return new Category(
      gwtCategory.getId(),
      gwtCategory.getKey(),
      gwtCategory.getName(),
      gwtCategory.getCategories().map(c => Category.fromGwt(c))
    )
  }
}

export default Category

export function toDrilldownItems(c) {
  if (c.subcategories.length === 0) {
    return { id: c.id, label: c.name }
  } else {
    return { id: c.id, label: c.name, children: c.subcategories.map(toDrilldownItems) }
  }
}
