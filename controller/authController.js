const jwt = require('jsonwebtoken')
const { CustomError } = require('../errors/customError')
const userModel = require('../models/userSchema')

require('dotenv')

const login = async (req, res) => {
    const { email, password } = req.body

    if (!password || !email) {
        throw new CustomError("Something is missing", 400)
    }

    const user = await userModel.findOne({ email: email })
    if (!user)
        throw new CustomError("User doesnt exist", 404)

    const isCorrectPassword = await user.comparePasswords(password)

    if (!isCorrectPassword)
        throw new CustomError("Wrong password", 401)

    const token = user.createJwt()

    res.status(200).json({ user: { name: user.name }, token })
}

const register = async (req, res) => {
    const { name, email, password } = req.body
    const user = await userModel.create({ name: name, password: password, email: email })
    const token = user.createJwt()
    res.status(200).json({ user: { name: user.name }, token })
}

module.exports = { login, register }