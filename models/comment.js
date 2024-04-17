const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    comment: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now }
})

CommentSchema.virtual("url").get(function () {
    return `/api/posts/${this.post}/comments/${this._id}`;
});

module.exports = mongoose.model("Comment", CommentSchema);