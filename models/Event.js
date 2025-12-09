const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    attendees: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
