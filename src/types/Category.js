
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
