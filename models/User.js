const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  ubication: {
    type: String,
    required:false
  },
  profile_pic: {
    type: String,
    required: false,
    default: "/uploads/default_avatar.png"
  },
  profile_background: {
    type: String,
    required: false,
    default: "/uploads/default_background.jpg"
  },
  likes : [{
    referer_id: String,
    
  },
  {
    object_type: String,
    
  }],
  influence: {
    type: Number,
    default: 0
  },
  visited_ubications: [{
    referer_id: String,
  }],
  description: {
    type: String,
    default: ''
  },
  styles: [
    {
      name: String
    }
  ],
  ranking: {
    type: Number,
    default: 0
  }


});

module.exports = User = mongoose.model("users", UserSchema);
