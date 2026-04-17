const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

connectDb();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Smart Campus Complaint API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Unexpected server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
