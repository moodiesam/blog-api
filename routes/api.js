const express = require("express");
const router = express.Router();

// Controller Module
const post_controller = require("../controllers/postController");

// JWT authorization middleware
const {protect} = require("../public/middleware/authMiddleware")


// GET Homepage

//router.get("/", post_controller.index);

// CRUD for posts

router.get('/', post_controller.read_posts)
router.post('/', protect, post_controller.create_post)
router.get('/:id', post_controller.get_post)
router.put('/:id', protect, post_controller.update_post)
router.delete('/:id', protect, post_controller.delete_post)

module.exports = router