const Event = require("../models/Event");

// @desc Create Event
exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

// @desc Get all events with filters
exports.getEvents = async (req, res, next) => {
  try {
    let query = {};

    if (req.query.date) query.date = req.query.date;
    if (req.query.location) query.location = req.query.location;

    query.status = "approved";

    const events = await Event.find(query).populate("createdBy", "name email");

    res.json({ success: true, events });
  } catch (error) {
    next(error);
  }
};

// @desc Get single event
exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

// @desc Update event
exports.updateEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

// @desc Delete event
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    await event.deleteOne();

    res.json({ success: true, message: "Event deleted" });
  } catch (error) {
    next(error);
  }
};

// ------------------ ADMIN CONTROLS ------------------

// @desc Admin approve event
exports.approveEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

// @desc Admin reject event
exports.rejectEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

// @desc Admin: Get pending events
exports.getPendingEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ status: "pending" }).populate(
      "createdBy",
      "name email"
    );

    res.json({ success: true, events });
  } catch (error) {
    next(error);
  }
};
