const Event = require("../models/Event");
const Registration = require("../models/Registration");

// Register for event
exports.registerForEvent = async (req, res, next) => {
  try {
    const { eventId } = req.body;

    const event = await Event.findById(eventId);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.status !== "approved")
      return res.status(400).json({ message: "Event not approved yet" });

    if (event.attendees.length >= event.capacity)
      return res.status(400).json({ message: "Event is full" });

    // Check duplicate registration
    const existing = await Registration.findOne({
      event: eventId,
      user: req.user.id
    });

    if (existing)
      return res.status(400).json({ message: "Already registered" });

    // Register user
    await Registration.create({
      event: eventId,
      user: req.user.id
    });

    event.attendees.push(req.user.id);
    await event.save();

    res.json({ success: true, message: "Registered successfully" });
  } catch (error) {
    next(error);
  }
};

// Cancel registration
exports.cancelRegistration = async (req, res, next) => {
  try {
    const { eventId } = req.body;

    await Registration.findOneAndDelete({
      user: req.user.id,
      event: eventId
    });

    const event = await Event.findById(eventId);
    event.attendees = event.attendees.filter(
      (id) => id.toString() !== req.user.id
    );
    await event.save();

    res.json({ success: true, message: "Registration cancelled" });
  } catch (error) {
    next(error);
  }
};
