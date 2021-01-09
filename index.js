if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const config = require('./common/config/env.config.js');

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

const indexHTML = path.resolve(__dirname, './frontend/build/index.html');
const staticPath = './frontend/build';
const api = require("./api");
// const AuthorizationRouter = require('./api/authorization/authorization.routes.config');
// const UsersRouter = require('./api/users/users.routes.config');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// AuthorizationRouter.routesConfig(app);
// UsersRouter.routesConfig(app);

// Static files
app.use('/', express.static(staticPath));
// API requests
app.use('/api', api);
// All other requests
app.get('/*', (req, res) => res.sendFile(indexHTML));

app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
