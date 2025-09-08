import { request } from "express";

class ApiErrorhandler extends Error {
    constructor (
        message ="Somting went wrong", 
        statusCode,
        errors =[],
        stack = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.data = null;
        this.message = message;
        if (stack){
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiErrorhandler };