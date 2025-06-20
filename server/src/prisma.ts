import { PrismaClient } from "@prisma/client";

// Singleton Prisma client to avoid exhausting DB connections in dev
const prisma = new PrismaClient();

export default prisma;
