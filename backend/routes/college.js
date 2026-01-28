const express = require("express");
const router = express.Router();
const { signup, login, getCollegeById, deleteStudent, uploadVideo } = require("../controllers/college");

router.post("/signup", signup);
router.post("/login", login);
router.get("/:id", getCollegeById);
router.post("/:id", deleteStudent);
router.post("/:id/upload", uploadVideo);

module.exports = router;
