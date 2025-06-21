"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = async (plain) => {
    const saltRounds = 10;
    return bcryptjs_1.default.hash(plain, saltRounds);
};
exports.hashPassword = hashPassword;
const comparePassword = async (plain, hash) => {
    return bcryptjs_1.default.compare(plain, hash);
};
exports.comparePassword = comparePassword;
