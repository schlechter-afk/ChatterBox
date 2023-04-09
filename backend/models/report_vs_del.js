const mongoose = require("mongoose");
const Schema = mongoose.Schema

const RepvDelSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    subgreddit_id : {
        type: String,
        required: true
    },
    reported: {
        type: Array,
        required: true
    },
    deleted: {
        type: Array,
        required: true
    },
});

module.exports = RepvsDel = mongoose.model("RepvsDel", RepvDelSchema);