const mongoose = require("mongoose");
const Schema = mongoose.Schema

const SubRedditSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    banned: {
        type: String,
        required: true,
    },
    posts: {
        type: Array,
    },
    people: {
        type: Array,
    },
    blocked: {
        type: Array,
    },
    moderators: {
        type: Array,
    },
    joinreqs: {
        type: Array,
    },
    leftusers: {
        type: Array,
    },
    image: {
        // type: String,
        // type: Buffer,
    },
    // date_stats: {
    //     type: Array,
    // }
});

module.exports = SubReddit = mongoose.model("SubReddit", SubRedditSchema)