const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    published: { type: Boolean, required: true, default: false }
});

PostSchema.virtual("url").get(function () {
    return `/blog/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);