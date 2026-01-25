const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const College = require("../models/college");

const signup = async (req, res) => {
    try {
        const { name, password, yearOfGraduation, phoneNumber, email, collegeName } = req.body;

        const existingUser = await College.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const referralCode = Math.random().toString(36).substring(2, 12).toUpperCase();

        const newCollege = new College({
            name,
            password: hashedPassword,
            yearOfGraduation,
            phoneNumber,
            email,
            collegeName,
            referralCode
        });

        await newCollege.save();

        const token = jwt.sign({ id: newCollege._id, role: "college" }, process.env.JWT_SECRET || "default_secret_key", { expiresIn: "1h" });

        res.status(201).json({ message: "College User created successfully", token, user: newCollege });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const collegeUser = await College.findOne({ email });
        if (!collegeUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const iSvalidPassword = await bcrypt.compare(password, collegeUser.password);
        if (!iSvalidPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: collegeUser._id, role: "college" }, process.env.JWT_SECRET || "default_secret_key", { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token, user: collegeUser });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

const getCollegeById = async (req, res) => {
    try {
        const collegeUser = await College.findById(req.params.id);
        if (!collegeUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(collegeUser);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

module.exports = {
    signup,
    login,
    getCollegeById
};
