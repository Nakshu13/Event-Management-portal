const express = require("express");
const router = express.Router();

const {
  registerForEvent,
  cancelRegistration
} = require("../controllers/registrationController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", protect, registerForEvent);
router.post("/cancel", protect, cancelRegistration);

module.exports = router;
