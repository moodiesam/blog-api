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
    res.status(200).json({ message: `CREATE post` });
})

exports.read_post = asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: `READ posts` });
})

exports.update_post = asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: `UPDATE post ${req.params.id}` });
})

exports.delete_post = asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: `DELETE post ${req.params.id}` });
})