"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizedRoles = exports.isAuthenticated = void 0;
const catchAsyncError_1 = require("./catchAsyncError");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("../utils/redis");
const user_1 = require("../controllers/user");
exports.isAuthenticated = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const access_token = req.cookies.access_token;
    if (!access_token) {
        return next(new ErrorHandler_1.default("Please Login to access this resource", 400));
    }
    const decoded = jsonwebtoken_1.default.decode(access_token);
    if (!decoded)
        return next(new ErrorHandler_1.default("Access token is not valid", 400));
    // check if the access token is expired
    if (decoded.exp && decoded.exp <= Date.now() / 1000) {
        try {
            await (0, user_1.updateAccessToken)(req, res, next);
        }
        catch (error) {
            return next(error);
        }
    }
    else {
        const user = await redis_1.redis.get(decoded.id);
        if (!user)
            return next(new ErrorHandler_1.default("Please Login to access this resource", 400));
        req.user = JSON.parse(user);
        next();
    }
});
// validate user role
const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role || "")) {
            return next(new ErrorHandler_1.default(`Role ${req.user?.role} is not allowed to access this resource`, 403));
        }
        next();
    };
};
exports.authorizedRoles = authorizedRoles;
