const express = require("express");
const router = express.Router();
const {
    signup,
    login,
    getCollegeStudentsWithReferrals
} = require("../controllers/admin");

router.post("/signup", signup);
router.post("/login", login);
router.get("/referrals", getCollegeStudentsWithReferrals);

module.exports = router;
