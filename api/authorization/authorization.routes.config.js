const express = require('express');
const router = express.Router();

const VerifyUserMiddleware = require('./middlewares/verify.user.middleware');
const AuthorizationController = require('./controllers/authorization.controller');
const AuthValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');

router.post('/', [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthorizationController.login
]);

router.post('/refresh', [
    AuthValidationMiddleware.verifyRefreshBodyField,
    // AuthValidationMiddleware.validRefreshNeeded,
    AuthorizationController.refreshToken
]);

module.exports = router;