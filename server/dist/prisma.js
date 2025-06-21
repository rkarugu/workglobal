"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// Singleton Prisma client to avoid exhausting DB connections in dev
const prisma = new client_1.PrismaClient();
exports.default = prisma;
