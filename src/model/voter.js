const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const voterSchema = new Schema(
    {
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
            required: true,
            unique: true
        },
        birthday: {
            type: Date,
            required: true
        },
        token: {
            value: {
                type: String,
                required: true
            },
            valid: {
                type: Boolean,
                required: true
            }
        },
        condidate: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Voter', voterSchema);
