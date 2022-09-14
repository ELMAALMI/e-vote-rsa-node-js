const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const condidateSchema = new Schema({
    f_name: {
        type: String,
        required: true
    },
    l_name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    }
});

module.exports = Condidate = mongoose.model('Condidate', condidateSchema);
