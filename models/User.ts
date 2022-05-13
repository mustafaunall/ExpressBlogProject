const { Schema, model } = require("mongoose");

const User = Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = model("User", User);
