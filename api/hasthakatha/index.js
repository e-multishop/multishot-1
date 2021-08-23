var mysql = require('mysql');
// for local setup, enable this
const settings = require('./src/config/config');

// for production setup, enable this
// const settings = require('./src/config/config-prod');

var con = mysql.createConnection({
    host: settings.db_host,
    user: settings.db_user,
    password: settings.db_password,
    database: settings.db_database,
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
const port = settings.port;
const hasthakatha_app = require('./src/app');
const login_app = require('./src/common/login');
const common_app = require('./src/common/common');
const product_app = require('./src/admin/product');
const hasthakatha_data=hasthakatha_app();
login_app(hasthakatha_data,con);
product_app(hasthakatha_data,con);
common_app(hasthakatha_data,con);
hasthakatha_data.listen(port);
