const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const voteSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        s_date: {
            type: Date,
            default: Date.now,
            required: true
        },
        e_date: {
            type: Date,
            required: true
        },
        condidates: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Condidate'
            }
        ],
        voters: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Voter'
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Vote', voteSchema);
