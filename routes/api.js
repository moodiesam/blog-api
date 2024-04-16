const express = require("express");
const router = express.Router();

// Controller Module
const post_controller = require("../controllers/postController");

// JWT authorization middleware
const {protect} = require("../public/middleware/authMiddleware")


// GET Homepage

//router.get("/", post_controller.index);

// CRUD for posts

router.get('/', post_controller.read_post)
router.post('/', protect, post_controller.create_post)
router.put('/:id', post_controller.update_post)
router.delete('/:id', post_controller.delete_post)

module.exports = router