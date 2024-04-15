const Post = require("../models/post");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: `GET request for index sent` });
});

exports.create_post = asyncHandler(async (req, res, next) => {
    if (!req.body.title) {
        res.status(400).json({ message: "please add a title field" })
    }

    const post = await Post.create({
        title: req.body.title,
        text: req.body.text,
    })
    res.status(200).json(post);
})

exports.read_post = asyncHandler(async (req, res, next) => {
    const posts = await Post.find()

    res.status(200).json({ message: `READ posts`, posts });
})

exports.update_post = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(400).json({ message: "post not found" })
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedPost);
})

exports.delete_post = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(400).json({ message: "post not found" })
    }

    await Post.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: `Post: ${post.title}... has been deleted` });
})