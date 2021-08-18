//const express = require('express')
//const jwt = require('jsonwebtoken')
//const app = express()
var mysql = require('mysql');
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
var btoa = require('btoa');
var login_data = [];
//const xlsxFile = require('read-excel-file/node');
const xlsx = require('xlsx');
const fs = require('fs');
var jwt_key = " secret";
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
const { query } = require('express');
const { restart } = require('nodemon');
const SMTPConnection = require('nodemailer/lib/smtp-connection');
const { time } = require('console');
const { strict } = require('assert');
const { SSL_OP_NO_TLSv1_2 } = require('constants');
const hasthakatha_app = require('./app');
const login_app = require('./common/login');
const hasthakatha_data=hasthakatha_app();
login_app(hasthakatha_data,con);
hasthakatha_data.listen(port);
