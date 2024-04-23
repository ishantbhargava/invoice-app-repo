const express = require("express");
const {
  signupController,
  signInController,
  forgetPasswordController,
} = require("../controllers/AuthControllers");
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", signInController);
router.post("/forget-password", forgetPasswordController);

module.exports = router;
