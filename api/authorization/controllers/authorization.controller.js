const jwtSecret = require('../../../common/config/env.config.js').jwt_secret;
const jwtExpiresIn = require('../../../common/config/env.config.js').jwt_expires_in;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const RefreshTokenModel = require('../../users/models/refresh-token.model');

exports.login = async (req, res) => {
    try {
        const user = req.body;
        const ipAddress = req.ip;
        const jwtToken = generateJwtToken(user);
        const refreshToken = await generateRefreshToken(user, ipAddress);

        res.status(201).send({
            user,
            accessToken: jwtToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        console.log("Login error: ", err);
        res.status(500).send({ errors: err });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const token = req.body.refresh_token;
        const ipAddress = req.ip;
        const refreshToken = await RefreshTokenModel.getRefreshToken(token);
        const user = refreshToken.user.toJSON();

        const jwtToken = generateJwtToken(user);
        const newRefreshToken = await generateRefreshToken(user, ipAddress);

        refreshToken.revoked = Date.now();
        refreshToken.revokedByIp = ipAddress;
        refreshToken.replacedByToken = newRefreshToken.token;
        await refreshToken.save();

        res.status(201).send({
            user,
            accessToken: jwtToken,
            refreshToken: newRefreshToken.token
        });
    } catch (err) {
        console.log("Refresh token error: ", err);
        res.status(500).send({ errors: err });
    }
}

// Helpers

function generateJwtToken (user) {
    // create a jwt token containing the user
    return jwt.sign(user, jwtSecret, { expiresIn: jwtExpiresIn });
}

function generateRefreshToken (user, ipAddress) {
    // create a refresh token that expires in 7 days
    return RefreshTokenModel.createRefreshToken({
        user: user.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7*24*60*60*1000),
        createdByIp: ipAddress
    });
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}
