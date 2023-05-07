const authRouter = require("../auth/auth.routes");
const categoryRouter = require("../category/category.routes");
const noteRouter = require("../notes/notes.routes");
const uploadRouter = require("../upload/upload.routes");
const reviewRoutes = require("../reviews/review.routes");

const routes = require("express").Router();
routes.use("/auth", authRouter);
routes.use("/notes", noteRouter);
routes.use("/category", categoryRouter);
routes.use("/review", reviewRoutes);
routes.use("/upload", uploadRouter);

module.exports = routes;
