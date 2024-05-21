const express = require("express");
const { signup, signIn, forget } = require("../controllers/AuthControllers");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", signIn);
router.post("/forget-password", forget);

module.exports = router;
