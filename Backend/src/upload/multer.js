const multer = require("multer");
const path = require("node:path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, "src/file/images/"); // store images in the public/images folder
    } else if (file.fieldname === "document") {
      cb(null, "src/file/documents/"); // store documents in the public/documents folder
    } else {
      cb(null, "src/file/uploads/"); // store other files in the public/uploads folder
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
