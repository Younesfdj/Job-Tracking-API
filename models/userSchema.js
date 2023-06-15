const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        match: [/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, "please provide a valid email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
    }
})
// This function will be executed before saving a new user document to the database.
UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJwt = function () {
    return jwt.sign({ userID: this._id, name: this.name }, process.env.SECRET_JWT, {
        expiresIn: process.env.JWT_EXP
    })
}

UserSchema.methods.comparePasswords = async function (notHashedPassword) {
    return await bcrypt.compare(notHashedPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)