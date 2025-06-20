import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import prisma from "./prisma";

import authRouter from "./routes/auth";
import submissionsRouter from "./routes/submissions";
import adminSubmissionsRouter from "./routes/adminSubmissions";

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files
const uploadsDir = path.resolve(__dirname, "../uploads");
app.use("/uploads", express.static(uploadsDir));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/submissions", submissionsRouter);
app.use("/api/admin/submissions", adminSubmissionsRouter);

// Serve frontend files in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../../dist');
  
  // Serve static files from the frontend build
  app.use(express.static(frontendPath, {
    index: false, // Don't serve index.html for all routes yet
    maxAge: '1y', // Cache static assets for 1 year
  }));

  // Handle SPA routing - return index.html for all other routes
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down...");
  await prisma.$disconnect();
  process.exit(0);
});
