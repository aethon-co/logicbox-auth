const express = require("express");
const router = express.Router();
const { signup, login, getCollegeById, deleteStudent } = require("../controllers/college");

router.post("/signup", signup);
router.post("/login", login);
router.get("/:id", getCollegeById);
router.post("/:id", deleteStudent);

module.exports = router;
