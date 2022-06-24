
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const voteSchema = new Schema({
  datestart: {
    type: Date,
    default: Date.now,
    required:true
  },
  dateend:{
    type:Date,
    required:true,
  },
  condidates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Condidate'
}]
});

module.exports = Vote = mongoose.model("Vote", voteSchema);