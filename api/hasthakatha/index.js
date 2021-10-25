var mysql = require('mysql2');
const isheroku =process && process.env && process.env.PORT ? true : false;
// for local setup, enable this

const settings = isheroku ?require('./src/config/config-prod'):require('./src/config/config');
const HasthaBean = require('./src/common/beans');

var con = mysql.createConnection({
    host: settings.db_host,
    user: settings.db_user,
    password: settings.db_password,
    database: settings.db_database,
    multipleStatements: true
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
const port = settings.port;
const hasthakatha_app = require('./src/app');
const login_app = require('./src/common/login');
const common_app = require('./src/common/common');
const payment_app = require('./src/common/payment');
const product_app = require('./src/admin/product');
const profile_app = require('./src/common/profile');
const order_app = require('./src/common/order');
const review_app= require('./src/common/review');
const hasthakatha_data=hasthakatha_app(settings);

const hasthaBean = new HasthaBean(con);
hasthaBean.initialize();

login_app(hasthakatha_data,con);
product_app(hasthakatha_data,con,hasthaBean);
common_app(hasthakatha_data,con);
payment_app(hasthakatha_data,con,settings);
profile_app(hasthakatha_data,con);
order_app(hasthakatha_data,con);
review_app(hasthakatha_data,con);
hasthakatha_data.listen(port);
