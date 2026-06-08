export class AppError extends Error {
    constructor(message , status){
        super(message);

        this.statusCode = statusCode;

        Error.captureStackTrace(
            this,
            this.constructor
        );
    }
}