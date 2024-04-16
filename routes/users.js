const express = require('express');
const router = express.Router();

const user_controller = require("../controllers/userController");

const {protect} = require('../public/middleware/authMiddleware');


// Create User
router.post('/', user_controller.create_user);

// Log in User
router.post('/login', user_controller.login_user);

// Get User Info
router.get('/user', protect, user_controller.get_user);

module.exports = router;
