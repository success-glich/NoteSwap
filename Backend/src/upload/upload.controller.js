const uploadFile = async (req, res) => {
  console.log(req.file);
  try {
    res.status(200).send(req.file);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const getUploadForm = (req, res) => {
  res.status(200).send("uploadForm");
};

module.exports = {
  uploadFile,
  getUploadForm,
};
