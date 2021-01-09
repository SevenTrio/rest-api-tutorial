const express = require('express');
const users = require('./users/users.routes.config');
const auth = require('./authorization/authorization.routes.config')
const router = express.Router();

router.use('/users', users);
router.use('/auth', auth);

module.exports = router;