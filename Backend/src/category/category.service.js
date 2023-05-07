class CategoryService {
  Category;
  constructor(Category) {
    this.Category = Category;
  }
  async insertCategory(title, userId) {
    try {
      const addedCategory = await new this.Category({
        title,
        user: userId,
      }).save();
      return addedCategory;
    } catch (err) {
      throw err;
    }
  }
  async getCategories() {
    try {
      const categories = await this.Category.find({}).populate({
        path: "user",
        select: "-password -__v",
      });
      return categories;
    } catch (err) {
      throw err;
    }
  }
  async deleteCategory(id) {
    try {
      const category = await this.Category.findByIdAndDelete(id);
      return category;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CategoryService;
