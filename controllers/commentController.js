const Comment = require("../models/comment");
const Post = require("../models/post");
const asyncHandler = require("express-async-handler");


// Get all comments for a post
exports.get_comments = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if(!post) {
        res.status(400).json({ message: "Post not found" })
        return;
    }

    const comments = await Comment.find({ post: req.params.id} )

    res.status(200).json({ comments })
})

// Create a comment
exports.create_comment = asyncHandler(async (req, res, next) => {
    if(!req.body.comment) {
        res.status(400).json({ message: "Please include a comment to post" })
        return;
    }

    const newComment = await Comment.create({
        author: req.user.id,
        post: req.params.id,
        comment: req.body.comment,
    })

    res.status(201).json({ newComment })
})

// Get a specific comment
exports.get_comment = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentid)

    if (!comment) {
        res.status(400).json({ message: "Comment not found" })
        return;
    }

    res.status(200).json({ comment })
})

// Update a comment
exports.update_comment = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentid)

    if (!comment) {
        res.status(400).json({ message: "Comment not found" })
        return;
    }

    const updatedComment = await Comment.findByIdAndUpdate(req.params.commentid, req.body, {new: true})

    res.json({ updatedComment })
})

// Delete a comment
exports.delete_comment = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentid)

    if (!comment) {
        res.status(400).json({ message: "Comment not found" })
        return;
    }

    await Comment.findByIdAndDelete(req.params.commentid)

    res.status(200).json({ message: `Comment: ${comment.comment}... has been deleted` })
})