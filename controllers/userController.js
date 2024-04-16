const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.create_user = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    if(!username || !password) {
        res.status(400).json({ message: "Please include username and password" })
        return;
    }

    const usernameExists = await User.findOne({username});

    if(usernameExists) {
        res.status(400).json({ message: "Username already exists" });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPassword,
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({ message: "Invalid user data" })
    }
})

exports.login_user = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({username});

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            id: user.id,
            username: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({ message: "Invalid Credentials" })
    }
})

// Generate JWT

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3d',
    })
}

exports.get_user = asyncHandler(async (req, res, next) => {
    const {_id, username} = await User.findById(req.user.id)

    res.status(200).json({ id:_id, username })
})