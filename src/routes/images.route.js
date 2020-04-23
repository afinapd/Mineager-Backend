const router = require("express").Router();

const Image = require("../models/image.model");

const ImageService = require("../services/images.service");
const imageService = new ImageService(Image);
const tokenValidation = require("../middlewares/token.validation");

const {
  addNewImage,
  findImageByType,
} = require("../controllers/images.controller");
const path = require("path");
const multer = require("multer");
const uuid = require("uuid");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v4() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.use(tokenValidation);
router.post("/:type/upload", upload.single("images"), (req, res) =>
  addNewImage(req, res, imageService)
);
router.get("/:type", (req, res) => findImageByType(req, res, imageService));

module.exports = router;

