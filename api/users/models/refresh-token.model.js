const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    token: String,
    expires: Date,
    created: { type: Date, default: Date.now },
    createdByIp: String,
    revoked: Date,
    revokedByIp: String,
    replacedByToken: String
});

refreshTokenSchema.virtual('isExpired').get(function () {
    return Date.now() >= this.expires;
});

refreshTokenSchema.virtual('isActive').get(function () {
    return !this.revoked && !this.isExpired;
});

// Ensure virtual fields are serialised.
refreshTokenSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // Remove these props when object is serialized
        delete ret._id;
        delete ret.id;
        delete ret.user;
    }
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

exports.createRefreshToken = (tokenData) => {
    const refreshToken = new RefreshToken(tokenData);
    return refreshToken.save();
};

exports.getRefreshToken = async (token) => {
    const refreshToken = await RefreshToken.findOne({ token }).populate('user');
    if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
    return refreshToken;
}

// module.exports = RefreshToken;