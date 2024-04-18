const express = require("express");
const router = express.Router();

// Blog Module
const blog_controller = require("../controllers/blogController");

// Routes

router.get('/', blog_controller.index);
router.get('/:id', blog_controller.get_post);

module.exports = router