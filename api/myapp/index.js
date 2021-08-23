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
const hasthakatha_app = require('./app');
const login_app = require('./common/login');
const common_app = require('./common/common');
const product_app = require('./admin/product');
const hasthakatha_data=hasthakatha_app();
login_app(hasthakatha_data,con);
product_app(hasthakatha_data,con);
common_app(hasthakatha_data,con);
hasthakatha_data.listen(port);
