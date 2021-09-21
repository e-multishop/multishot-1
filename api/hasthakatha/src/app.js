const express = require('express')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
var cors = require('cors');
const bodyParser = require('body-parser');
var hasthakatha_app = function (settings) {
    const app = express()
    if (settings.CORS) {
        // enabled for local testing only
        app.use(cors());
    }
    const oneDay = 1000 * 60 * 60 * 24;
    app.use(sessions({
        secret: settings.session_secret,
        saveUninitialized:true,
        cookie: { maxAge: oneDay },
        resave: false
    }));
    app.use(express.static(__dirname + '/../public'));  //Serves resources from public folder
    app.use(express.json({ limit: "70mb" }));
    app.use(bodyParser.json({ limit: "70mb" }));
    app.use(express.urlencoded({limit: "70mb", extended: true, parameterLimit: 70000 }));
    app.use(bodyParser.urlencoded({limit: "70mb", extended: true, parameterLimit: 70000 }));
    return app;
}
module.exports = hasthakatha_app;