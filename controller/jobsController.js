const { CustomError } = require('../errors/customError')
const jobsModel = require('../models/jobsSchema')
const { StatusCodes } = require('http-status-codes')

const getAllJobs = async (req, res) => {
    const { userID } = req.user
    const userJobs = await jobsModel.find({ createdBy: userID }).sort('createdAt')
    res.status(StatusCodes.OK).json({userJobs,count : userJobs.length})
}
const getJob = async (req, res) => {
    const { id } = req.params
    const { userID } = req.user
    const foundJob = await jobsModel.findOne({ _id: id, createdBy: userID })
    if (!foundJob)
        throw new CustomError("Job not found", StatusCodes.NOT_FOUND)
    res.status(StatusCodes.OK).json(foundJob)
}
const createJob = async (req, res) => {
    const { userID } = req.user
    const userJob = await jobsModel.create({ ...req.body, createdBy: userID })
    res.status(StatusCodes.CREATED).json(userJob)
}
const updateJob = async (req, res) => {
    const { id } = req.params
    const { userID } = req.user

    const foundJob = await jobsModel.findOneAndUpdate({ _id: id, createdBy:userID}, req.body, {
        new: true,
        runValidators: true,
    })

    if (!foundJob) {
        throw new CustomError("Job not found", StatusCodes.NOT_FOUND)
    }

    res.status(200).json(foundJob)
}

const deleteJob = async (req, res) => {
    const { id } = req.params
    const { userID } = req.user
    const foundJob = await jobsModel.findOneAndDelete({ _id: id, createdBy: userID })
    if (!foundJob)
        throw new CustomError("Job not found", StatusCodes.NOT_FOUND)
    res.status(StatusCodes.OK).json(foundJob)
}

module.exports = {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
}