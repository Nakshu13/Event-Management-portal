const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  approveEvent,
  rejectEvent
} = require("../controllers/eventController");

const { protect, authorize } = require("../middleware/authMiddleware");
const { getPendingEvents } = require("../controllers/eventController");

// Public → view events
router.get("/", getEvents);
router.get("/:id", getEvent);

// Protected → create/update/delete
router.post("/", protect, createEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

// Admin Routes
router.put("/:id/approve", protect, authorize("admin"), approveEvent);
router.put("/:id/reject", protect, authorize("admin"), rejectEvent);
// Admin – get pending events
router.get("/admin/pending", protect, authorize("admin"), getPendingEvents);

module.exports = router;
