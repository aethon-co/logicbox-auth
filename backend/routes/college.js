const express = require("express");
const router = express.Router();
const { signup, login, getCollegeById } = require("../controllers/college");

router.post("/signup", signup);
router.post("/login", login);
router.get("/:id", getCollegeById);

module.exports = router;
