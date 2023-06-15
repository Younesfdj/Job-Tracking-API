class CustomError extends Error{
    constructor(errorMessage,errorStatus){
        super(errorMessage)
        this.errorStatus = errorStatus
    }
}

module.exports = {CustomError}