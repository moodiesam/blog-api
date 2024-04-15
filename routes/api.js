const express = require("express");
const router = express.Router();

// Controller Modules

const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");

// GET Homepage

router.get("/", post_controller.index);

// CRUD for posts

router.get('/posts', post_controller.read_post)
router.post('/posts', post_controller.create_post)
router.put('/posts/:id', post_controller.update_post)
router.delete('/posts/:id', post_controller.delete_post)

module.exports = router