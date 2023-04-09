const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema

const ReportSchema = new Schema({
    reported_by: {
        type: String,
        required: true
    },
    reported_user: {
        type: String,
        required: true
    },
    concern: {
        type: String,
        required: true
    },
    posttext: {
        type: String,
        required: true,
    },
    postedin: {
        type: String,
        required: true,
    },
    action: {
        type:String,
        required: true,
    },
    dateexp: {
        type: Date,
        expires: 864000,
        // default: Date.now,
    }
});

module.exports = Reported = mongoose.model("Reported", ReportSchema);