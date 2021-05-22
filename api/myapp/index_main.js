const express = require('express')
const app = express()
// var mysql = require('mysql');
app.use(express.static(__dirname + '/public')); //Serves resources from public folder
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "hasthakatha"
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });
const port = 3000;
var path = require('path');
app.get('/search', (req, res) => {
    res.header("Content-Type", 'application/json');
    // res.send(JSON.stringify(data)); });
    res.sendFile(path.resolve('apidata/data.json'));
});

app.get('/categories', (req, res) => {
    res.header("Content-Type", 'application/json');
    // res.send(JSON.stringify(data)); });
    res.sendFile(path.resolve('apidata/categories.json'));
});

app.get('/colour', (req, res) => {
    res.header("Content-Type", 'application/json');
    // res.send(JSON.stringify(data)); });
    res.sendFile(path.resolve('apidata/colour.json'));
});

app.get('/product', (req, res) => {
    res.header("Content-Type", 'application/json');
    // res.send(JSON.stringify(data)); });
    res.sendFile(path.resolve('apidata/product.json'));
});
// app.get('/', (req, res) => {


//     res.send("hi");

// });
app.listen(port);
