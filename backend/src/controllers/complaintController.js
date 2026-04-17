const Complaint = require("../models/Complaint");

const createComplaint = async (req, res) => {
  try {
    const { category, location, description } = req.body;
    if (!category || !location || !description) {
      return res.status(400).json({ message: "Category, location and description are required" });
    }

    const complaint = await Complaint.create({
      student: req.user.id,
      category,
      location,
      description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : "",
    });

    return res.status(201).json(complaint);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ student: req.user.id }).sort({ createdAt: -1 });
    return res.json(complaints);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllComplaints = async (_req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });
    return res.json(complaints);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate("student", "name email");

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const isAdmin = req.user.role === "admin";
    const isOwner = complaint.student?._id?.toString() === req.user.id;
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.json(complaint);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "In Progress", "Resolved"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("student", "name email");

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    return res.json(complaint);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
};
