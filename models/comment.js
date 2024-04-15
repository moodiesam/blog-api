const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: { type: String, required: true },
    comment: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now }
})

CommentSchema.virtual("url").get(function () {
    return `/api/post/${this._id}`;
});

module.exports = mongoose.model("Comment", CommentSchema);