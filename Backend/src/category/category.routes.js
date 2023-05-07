const { verifyUser, checkAdmin } = require("../auth/auth.middleware");
const CategoryController = require("./category.controller");
const categoryRouter = require("express").Router();

categoryRouter.post(
  "/",
  verifyUser,
  checkAdmin,
  CategoryController.createCategory
);
categoryRouter.get("/", CategoryController.getCategory);
categoryRouter.route("/:id").delete(CategoryController.deleteCategory);

module.exports = categoryRouter;
