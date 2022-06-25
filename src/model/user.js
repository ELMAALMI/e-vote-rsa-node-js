const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});
UserSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = crypto.randomUUID();
        this.hashed_password = this.cryptPassword(password);
    })
    .get(function () {
        return this._password;
    });
UserSchema.methods = {
    cryptPassword: function (password) {
        if (!password) return '';

        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        } catch (error) {
            return '';
        }
    },
    authenticate: function (plaintext) {
        return this.cryptPassword(plaintext) === this.hashed_password;
    }
};

module.exports = User = mongoose.model('User', UserSchema);
