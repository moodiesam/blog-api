const Post = require("../models/post");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

// Get list of all published blog posts

exports.index = asyncHandler(async (req, res, next) => {
    const allPublishedPosts = await Post.find({ published: true }, "title timestamp")
        .sort({ timestamp: -1 })
        .exec();

    res.render("index", { title: "Sam's Blog", posts_list: allPublishedPosts });
});

exports.get_post = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id)
        .exec();

    const allComments = await Comment.find({ post: req.params.id })
        .populate("author")
        .sort({ timestamp: -1 })
        .exec();

    console.log(allComments)

    res.render("blog_post", { post: post, comments: allComments });
});