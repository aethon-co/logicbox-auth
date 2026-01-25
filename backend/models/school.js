const mongoose = require("mongoose")

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    yearOfGraduation: {
        type: Number,
        required: true,
        minlength: 4
    },
    phoneNumber: {
        type: Number,
        required: true,
        minlength: 10
    },
    // email: {
    //     type: String,
    //     required: true,
    //     minlength: 3
    // },
    schoolName: {
        type: String,
        required: true,
        minlength: 3
    },
    standard: {
        type: String,
        required: true,
        minlength: 3
    },
    address: {
        type: String,
        required: true,
        minlength: 3
    },
    referralCode: {
        type: String,
        required: true,
        minlength: 3
    },
    feedbackDetails: {
        type: String,
        required: true,
        minlength: 3
    }
})

module.exports = mongoose.model('schooluser', schoolSchema)
