const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const validation = require("./validation");


router.post("/api/signup", validation.validateUsers, userController.signUp);
router.post("/api/signin", validation.validateUsers, userController.signIn);
router.get("/api/signout", userController.signOut);

module.exports = router;