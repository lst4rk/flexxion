const mongoose = require("mongoose");
// const User = require('./User');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Workout',
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  exercise1: {
    type: String,
  },
  sets1: {
    type: Number,
    default: 0
  },
  reps1: {
    type: Number,
    default: 0
  },
  exercise2: {
    type: String,
  },
  sets2: {
    type: Number,
    default: 0
  },
  reps2: {
    type: Number,
    default: 0
  },
  exercise3: {
    type: String,
  },
  sets3: {
    type: Number,
    default: 0
  },
  reps3: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model("Post", PostSchema);