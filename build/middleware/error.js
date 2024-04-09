"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const ErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";
    //wrong mongoDB id
    if (err.name === "CastError") {
        const message = `Resource Not Found. Invalid:${err.path}`;
        err = new ErrorHandler_1.default(message, 400);
    }
    // duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler_1.default(message, 400);
    }
    //jsonwebtoken error
    if (err.name === "JsonwebTokenError") {
        const message = `Json web token is Invalid, Try Again`;
        err = new ErrorHandler_1.default(message, 400);
    }
    //JWT expired error
    if (err.name === "TokenExpiredError") {
        const message = `Json web token is expired Try Again`;
        err = new ErrorHandler_1.default(message, 400);
    }
    res.status(err.statusCode).json({
        success: true,
        message: err.message,
    });
};
exports.ErrorMiddleware = ErrorMiddleware;
