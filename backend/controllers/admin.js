const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const College = require("../models/college");
const School = require("../models/school");

const signup = async (req, res) => {
    try {
        const { name, password, username } = req.body;

        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            name,
            password: hashedPassword,
            username
        });

        await newAdmin.save();

        const token = jwt.sign({ id: newAdmin._id, role: "admin" }, process.env.JWT_SECRET || "default_secret_key", { expiresIn: "1h" });

        res.status(201).json({ message: "Admin created", token, user: newAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error creating admin", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET || "default_secret_key", { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token, user: admin });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};



const getCollegeStudentsWithReferrals = async (req, res) => {
    try {
        const colleges = await College.find();
        const schools = await School.find({ referralCode: { $ne: 'DIRECT' } });

        const collegesWithReferrals = colleges.map(college => {
            const referredSchools = schools.filter(school => school.referralCode === college.referralCode);
            return {
                ...college.toObject(),
                referredSchools
            };
        });

        res.status(200).json(collegesWithReferrals);
    } catch (error) {
        res.status(500).json({ message: "Error fetching college students with referrals", error: error.message });
    }
};

module.exports = {
    signup,
    login,
    getCollegeStudentsWithReferrals
};
