const Category = require("./category");

const CategoryService = require("./category.service");

const categoryService = new CategoryService(Category);

module.exports = categoryService;
