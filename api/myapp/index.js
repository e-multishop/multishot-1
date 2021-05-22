const express = require('express')
const app = express()
var mysql = require('mysql');
app.use(express.static(__dirname + '/public')); //Serves resources from public folder
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
        res.header("Content-Type", "application/json");
      
        let asyncoperations = [];
        let images = [];
        for (var k = 0; k < result.length; k++) {
            let temp = result[k].pid;
            let sql = "SELECT pid,type,url from `product_images` WHERE pid='" + temp + "'";
            //     let sql = `SELECT pid,type,url from product_images WHERE pid='${temp}'`;
            let p = new Promise(function (resolve, reject) {
                con.query(sql, function (err, result2) {
                    // console.log(result2[i].url);
                    images = images.concat(result2);
                    for (var i = 0; i < result.length; i++) {
                        for (var j = 0; j < images.length; j++) {
                            var temp = result[i];
                            if (temp.pid == images[j].pid) {
                                temp.url = images[j].url;
                            }
                        }

                    }
                    resolve();
                })


            });
            asyncoperations.push(p);
        }
        Promise.all(asyncoperations).then(function(ops)
            {
                    console.log(ops);
                    res.send(JSON.stringify(result));

    
            });

    });
});
// app.get('/', (req, res) => {


//     res.send("hi");

// });
app.listen(port);
