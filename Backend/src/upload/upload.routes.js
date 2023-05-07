const uploadRouter = require("express").Router();
const upload = require("./multer");
const { uploadFile } = require("./upload.controller");
uploadRouter.get("/");

uploadRouter.post("/", upload.single("file"), uploadFile);
module.exports = uploadRouter;
