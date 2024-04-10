#! /usr/bin/env node

console.log("This will create the admin user in the database");

const userArgs = process.argv.slice(2);

const bcrypt = require("bcryptjs");
const User = require("./models/user");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createUser();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
};

async function userCreate(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10)

    const userdetail = {
        username: username,
        password: hashedPassword
    }

    const user = new User(userdetail);
    await user.save();
    console.log(`Added user: ${username}`);
};

async function createUser() {
    console.log("adding user");
    await userCreate("UserOne", "PasswordOne");
}