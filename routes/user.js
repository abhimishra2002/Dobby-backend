const express = require("express");
const {
  userValidtor,
  validate,
  signInValidator,
} = require("../middlewares/validator");
const { isAuth } = require("../middlewares/isAuth");

const { signup, signIn, getAuthDetails } = require("../controllers/user");

const router = express.Router();

router.post("/create", userValidtor, validate, signup);
router.post("/sign-in", signInValidator, validate, signIn);
router.get("/is-auth", isAuth, getAuthDetails);

module.exports = router;
