import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

// Fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" })); // to parse the incoming requests with JSON payloads (from req.body)
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // to parse URL-encoded bodies
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
	res.status(200).json({ message: "Server is running", timestamp: new Date().toISOString() });
});

// Serve static files from frontend/dist (production) or frontend (development)
const frontendPath = path.join(__dirname, "..", "frontend");
const distPath = path.join(frontendPath, "dist");

// Check if dist folder exists (production build)
try {
	if (fs.existsSync(distPath)) {
		// Production: serve built files
		app.use(express.static(distPath));
		app.get("*", (req, res) => {
			res.sendFile(path.join(distPath, "index.html"));
		});
		console.log("✅ Serving production build from frontend/dist");
	} else {
		// Development: serve a simple message
		app.get("*", (req, res) => {
			res.json({ 
				message: "Backend server is running. Frontend should be served by Vite dev server on http://localhost:5173",
				frontend_url: "http://localhost:5173"
			});
		});
		console.log("⚠️  No frontend build found. Please run 'npm run build' in frontend folder or use Vite dev server");
	}
} catch (error) {
	console.error("Error checking frontend build:", error);
}

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
