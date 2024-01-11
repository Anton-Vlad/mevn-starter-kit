const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
            validate: [
                (val) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val),
            ]
        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        refresh_token: String,
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
    }
)

UserSchema.virtual('full_name').get(function () {
    return this.first_name + ' ' + this.last_name
});
UserSchema.virtual('id').get(function () {
    return this._id
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

UserSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});

module.exports = mongoose.model('User', UserSchema)