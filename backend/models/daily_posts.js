const mongoose = require("mongoose");
const Schema = mongoose.Schema

const DailyPostsSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    daily_posts: {
        type: Array,
        required: true
    },
    subgreddit_id : {
        type: String,
        required: true
    }
});

module.exports = DailyPosts = mongoose.model("DailyPosts", DailyPostsSchema)