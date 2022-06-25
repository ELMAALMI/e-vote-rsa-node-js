const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const voterSchema = new Schema({
    f_name: {
        type: String,
        required: true
    },
    l_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    token: {
        key: {
            type: String,
            required: true
        },
        valid: {
            type: Boolean,
            required: true
        }
    },
    condidate: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Voter', voterSchema);
