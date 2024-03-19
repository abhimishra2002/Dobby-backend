const express = require("express");

const {
  getImageById,
  getImageBySearch,
  getImage,
  createImage,
} = require("../controllers/images");

const { isAuth } = require("../middlewares/isAuth");
const { uploadImage } = require("../middlewares/multer");
const { validateImage, validate } = require("../middlewares/validator");

const router = express.Router();

router.post(
  "/upload-image",
  isAuth,
  uploadImage.single("image"),
  validateImage,
  validate,
  createImage
);

router.get("/images", isAuth, getImage);
router.get("/getImageById/:imageId", isAuth, getImageById);
router.get("/imageSearch", isAuth, getImageBySearch);

module.exports = router;