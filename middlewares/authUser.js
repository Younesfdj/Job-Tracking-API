const { CustomError } = require('../errors/customError')
const jwt = require('jsonwebtoken')
require('dotenv')

const authMiddlware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer '))
        throw new CustomError("You should connect first", 401)
    const authToken = authHeader.split(" ")[1]
    try {
        const { userID, name } = jwt.verify(authToken, process.env.SECRET_JWT)
        req.user = { userID, name }
        next()
    } catch (error) {
        throw new CustomError(error, 401)
    }
}

module.exports = authMiddlware