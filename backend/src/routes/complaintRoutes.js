const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  getMyComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");
const { protect, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/", protect, authorizeRoles("student"), upload.single("image"), createComplaint);
router.get("/my", protect, authorizeRoles("student"), getMyComplaints);
router.get("/:id", protect, getComplaintById);
router.get("/", protect, authorizeRoles("admin"), getAllComplaints);
router.patch("/:id/status", protect, authorizeRoles("admin"), updateComplaintStatus);

module.exports = router;
