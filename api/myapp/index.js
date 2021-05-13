const express = require('express')
const app = express()
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hasthakatha"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
const port = 3000;
var path = require('path');
app.get('/search', (req, res) => {
    res.header("Content-Type", 'application/json');
    // res.send(JSON.stringify(data)); });
    res.sendFile(path.resolve('search/data.json'));
});

app.get('/categories', (req, res) => {
    var sql = "SELECT name FROM `category`";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

app.get('/colour', (req, res) => {
    var sql = "SELECT name FROM `colour` ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

app.get('/product', (req, res) => {
    var sql = "SELECT title,pid,price,total_available FROM product ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.header("Content-Type","application/json");
        res.send(JSON.stringify(result));
        
    });
});
app.get('/', (req, res) => {


    res.send("hi");

});
app.listen(port, () => {
    console.log('listen');
});
