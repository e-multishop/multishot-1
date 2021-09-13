const express = require('express')
var cors = require('cors');
const bodyParser = require('body-parser');
var hasthakatha_app = function (settings) {
    const app = express()
    if (settings.CORS) {
        // enabled for local testing only
        app.use(cors());
    }
    app.use(express.static(__dirname + '/../public'));  //Serves resources from public folder
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000 }));
    return app;
}
module.exports = hasthakatha_app;