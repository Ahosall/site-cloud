const controller = require("../controllers/files.controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/");
  },
  filename: function (req, file, cb) {
    const extFile = file.originalname.split(".")[1];
    const nFileName = require("crypto").randomBytes(16).toString("hex");
    cb(null, `${nFileName}.${extFile}`);
  },
});

const upload = multer({ storage });

module.exports = [
  {
    path: "/",
    method: "GET",
    router: controller.getFiles,
  },
  {
    path: "/add",
    method: "POST",
    router: controller.addFiles,
    upload: upload.any("files"),
  },
];
