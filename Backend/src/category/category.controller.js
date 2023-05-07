const categoryService = require(".");

const CategoryController = {
  createCategory: async (req, res) => {
    // console.log(typeof user, user[0]._id);
    const { title } = req.body;
    const { _id } = req.user;
    console.log(req.body);
    //do some logic
    try {
      const category = await categoryService.insertCategory(title, _id);
      return res.status(200).json({
        message: "Category created Successfully",
        category,
      });
    } catch (err) {
      return res.status(401).json({
        message: err.message,
      });
    }
  },
  getCategory: async (req, res) => {
    try {
      // do some logic
      const categories = await categoryService.getCategories();
      return res.status(200).json({
        message: "Category  found",
        categories,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  deleteCategory: async (req, res) => {
    const { id } = req.params;

    try {
      const category = await categoryService.deleteCategory(id);
      return res.status(200).json({
        message: "Category Delete successfully",
        category,
      });
    } catch {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
};
module.exports = CategoryController;
