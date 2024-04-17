const express = require("express");
const router = express.Router();

// Controller Module
const comment_controller = require("../controllers/commentController");

// JWT authorization middleware
const {protect} = require("../public/middleware/authMiddleware");

// CRUD for comments

router.get('/:id/comments', comment_controller.get_comments);
router.post('/:id/comments', protect, comment_controller.create_comment);
router.get('/:id/comments/:commentid', comment_controller.get_comment);
router.put('/:id/comments/:commentid', protect, comment_controller.update_comment);
router.delete('/:id/comments/:commentid', protect, comment_controller.delete_comment);

module.exports = router