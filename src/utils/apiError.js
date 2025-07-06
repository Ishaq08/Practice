class apiError extends Error{
    constructor(
        statusCode,
        message = "Some thing went Wrong",
        error = [],
        stack = ""

    ) {
        super(message)

        if (typeof statusCode !== "number") {
            throw new Error("StatusCode must be a number")
        }
        this.statusCode = statusCode
        this.success = false
        this.data = null
        this.message = message
        this.error = error
        
        if (stack) {
            this.stack = stack
            
        } else {
            Error.captureStackTrace(this,this.constructor)
            
        }
        
    }
}
export { apiError }