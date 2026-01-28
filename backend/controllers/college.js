const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const College = require("../models/college");
const School = require("../models/school")
const s3Service = require("../services/s3.service");

const signup = async (req, res) => {
    try {
        const { name, password, yearOfGraduation, phoneNumber, email, collegeName } = req.body;

        const existingUser = await College.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "" });
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
        const referral = collegeUser.referralCode;
        const referrals = await School.find({ referralCode: referral });

        res.status(200).json({ collegeUser, referrals });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const student = await School.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        student.isEnabled = false;
        await student.save();
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting student", error: error.message });
    }
}



const uploadVideo = async (req, res) => {
    try {
        const { studentId } = req.params;
        const file = req.file; 

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const student = await School.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const { url, key } = await uploadVideoToS3(file);

        student.videoUrl = url;
        student.videoKey = key;
        await student.save();

        res.status(200).json({
            message: "Video uploaded successfully",
            url
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading video", error: error.message });
    }
};

module.exports = {
    signup,
    login,
    getCollegeById,
    deleteStudent,
    uploadVideo
};
