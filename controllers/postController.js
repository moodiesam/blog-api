const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: `GET request for index sent` });
});

// Create a Blog Post
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

// Find all Blog Posts
exports.read_posts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find()

    res.status(200).json({ message: `READ posts`, posts });
})

// Find specific Blog Post
exports.get_post = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(400).json({ message: "Post not found" });
        return;
    }

    res.status(200).json({post});
})

// Update a specific Blog Post
exports.update_post = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(400).json({ message: "post not found" })
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedPost);
})

// Delete a specific Blog Post
exports.delete_post = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(400).json({ message: "post not found" })
        return;
    }

    await Post.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: `Post: ${post.title}... has been deleted` });
})