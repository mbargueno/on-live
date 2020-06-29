const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TimelineSchema = new Schema({
  picture: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = Timeline = mongoose.model("timelines", TimelineSchema);