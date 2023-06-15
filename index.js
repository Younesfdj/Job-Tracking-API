require('dotenv').config()
require('express-async-errors')

// security packages 
const helmet = require('helmet')
const cors = require('cors')
const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit')


const path = require('path');
const express = require('express')
const app = express()
const authRouter = require('./route/authRouter')
const jobsRouter = require('./route/jobsRouter')
const connectDB = require('./db/connectDB')
const notFound = require('./middlewares/notFound')
const errHandler = require('./middlewares/errHandler')
const authUser = require('./middlewares/authUser')

PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authUser, jobsRouter)

app.use(notFound)
app.use(errHandler)

app.use(helmet())
app.use(cors())
app.use(xssClean())

app.set('trust proxy', 1)
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)))
}))

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`Server is listening on port ${PORT}`))

    } catch (error) {
        console.log(error)
    }
}

start()