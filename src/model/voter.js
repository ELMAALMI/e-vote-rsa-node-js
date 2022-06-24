const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const voterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required:true
  },
  tokens: {
    access: {
        type: String
    },
    token: {
        type: String
    }
},
});

module.exports = Voter = mongoose.model("Voter", voterSchema);

