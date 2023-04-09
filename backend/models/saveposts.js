const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema

const SaveSchema = new Schema(
{
    savedetails: {
        type: Array,
    },
    subgname: {
        type: String,
    }
});

module.exports = SaveDets = mongoose.model("SaveDets", SaveSchema);