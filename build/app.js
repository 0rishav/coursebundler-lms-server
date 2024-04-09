"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_1 = require("./middleware/error");
const user_1 = __importDefault(require("./routes/user"));
const course_1 = __importDefault(require("./routes/course"));
const order_1 = __importDefault(require("./routes/order"));
const notification_1 = __importDefault(require("./routes/notification"));
const analytics_1 = __importDefault(require("./routes/analytics"));
const layout_1 = __importDefault(require("./routes/layout"));
const morgan_1 = __importDefault(require("morgan"));
// body-parser
exports.app.use(express_1.default.json({ limit: "50mb" }));
exports.app.use((0, morgan_1.default)("dev"));
//cookie-parser
exports.app.use((0, cookie_parser_1.default)());
//cors
exports.app.use((0, cors_1.default)({
    origin: ['http://localhost:3000'],
    credentials: true,
}));
// routes
exports.app.use("/api/v1", user_1.default);
exports.app.use("/api/v1", course_1.default);
exports.app.use("/api/v1", order_1.default);
exports.app.use("/api/v1", notification_1.default);
exports.app.use("/api/v1", analytics_1.default);
exports.app.use("/api/v1", layout_1.default);
//TESTING API
exports.app.get("/test", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "API is working",
    });
});
exports.app.use(error_1.ErrorMiddleware);
//unknown route
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
