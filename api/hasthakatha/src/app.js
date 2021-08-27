const express = require('express')
var cors = require('cors');
const bodyParser = require('body-parser');
var hasthakatha_app = function () {
    const app = express()
   // app.use(express.json());
    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(express.static(__dirname + '/../public'));  //Serves resources from public folder
   // app.use(express.json());
    app.use(cors());
    return app;
}
module.exports = hasthakatha_app;