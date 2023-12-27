const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const fileName = `${uuidv4()}-${Date.now()}.jpg`;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/categories"));
  }, //

  filename: function (req, file, cb) {
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

exports.images = upload.single("image");
