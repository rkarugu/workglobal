"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const prisma_1 = __importDefault(require("./prisma"));
const auth_1 = __importDefault(require("./routes/auth"));
const submissions_1 = __importDefault(require("./routes/submissions"));
const adminSubmissions_1 = __importDefault(require("./routes/adminSubmissions"));
const app = (0, express_1.default)();
const allowedOrigins = [
    'https://workforceinternational.agency',
    'http://localhost:5173', // Vite default, change if you use another port
    'http://localhost:3000', // Create React App default
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    }
}));
app.use(express_1.default.json());
// Serve uploaded files
const uploadsDir = path_1.default.resolve(__dirname, "../uploads");
app.use("/uploads", express_1.default.static(uploadsDir));
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.use("/api/auth", auth_1.default);
app.use("/api/submissions", submissions_1.default);
app.use("/api/admin/submissions", adminSubmissions_1.default);
// Serve frontend files in production
if (process.env.NODE_ENV === 'production') {
    const frontendPath = path_1.default.join(__dirname, '../../dist');
    // Serve static files from the frontend build
    app.use(express_1.default.static(frontendPath, {
        index: false, // Don't serve index.html for all routes yet
        maxAge: '1y', // Cache static assets for 1 year
    }));
    // Handle SPA routing - return index.html for all other routes
    app.get('*', (_req, res) => {
        res.sendFile(path_1.default.join(frontendPath, 'index.html'));
    });
}
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("Shutting down...");
    await prisma_1.default.$disconnect();
    process.exit(0);
});
