const mongoose = require("mongoose");
const Schema = mongoose.Schema

const DailyVisitorsSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    visitors: {
        type: Array,
        required: true
    },
    subgreddit_id : {
        type: String,
        required: true
    }
});

module.exports = DailyVisitors = mongoose.model("DailyVisitors", DailyVisitorsSchema);