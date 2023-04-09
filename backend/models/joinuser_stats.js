const mongoose = require("mongoose");
const Schema = mongoose.Schema

const JoinUser = new Schema({
    date: {
        type: String,
        required: true
    },
    joined_users: {
        type: Array,
        required: true
    },
    subgreddit_id : {
        type: String,
        required: true
    }
});

module.exports = JoinUserStats = mongoose.model("JoinUserStats", JoinUser)