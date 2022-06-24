const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const condidateSchema = new Schema({
  family_name: {
    type: String,
    required: true
  },
    firstname: {
    type: String,
    required: true
  },

});

module.exports = Condidate = mongoose.model("Condidate", condidateSchema);