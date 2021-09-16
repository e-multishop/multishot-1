const bcrypt = require('bcrypt');
const crypto = require('crypto');
var btoa = require('btoa');
const jwt = require('jsonwebtoken')
const xlsx = require('xlsx');
const fs = require('fs');
var cors = require('cors');
const creds = require('../config/config');
var jwt_key = " secret";
var login_data = [];
const nodemailer = require('nodemailer');
var login_app=function(app,con)
{
    app.post('/rest/signup', (req, res) => {
        var sql = "select email from loginusers where email= '" + req.body.email + "'";
        con.query(sql, function (err, result) {
            console.log("messaage" + result);
            if (result.length === 0) {
                const hash = bcrypt.hash(req.body.password, 10, function (err, hashpassword) {
                    console.log(hashpassword);
                    const createdDate = (new Date()).getTime();
                    const tStart = 'START TRANSACTION;';
                    const loginSql = "insert into loginusers values(null,'','" + req.body.email + "','" + hashpassword + "');";
                    const userSql = `insert into user (name, type, uid, created_date) values('${req.body.email}', '0', LAST_INSERT_ID(), ${createdDate});`;
                    const tEnd = 'COMMIT;';
                    const actualSql = tStart + loginSql + userSql + tEnd;
                    con.query(actualSql, function (err, result2) {
                        if (err) throw err;
                        res.send("sucess");
                    });
    
                });
            } else {
                res.status(500);
                res.send("email is already registered");
            }
    
            if(err) throw err;
            // res.send("found");
    
        });
        //   console.log(req.body);
        // const {email, password}=req.body;
    
    
    });
    
    
    app.post('/rest/login', (req, res) => {
        var sql = "select * from loginusers as L LEFT JOIN user as U on L.id = U.uid WHERE L.email= '" + req.body.email + "'";
        con.query(sql, function (err, result) {
            if (result != null && result.length == 1) {
    
                bcrypt.compare(req.body.password, result[0].password, function (err, result2) {
                    if (result2 === true) {
                        const session_id = jwt.sign(
                            {
                                email: result[0].email,
                                userId: result[0].id,
                                userType: result[0].type
                            },
                            jwt_key,
                            {
                                expiresIn: "1h"
                            }
                        );
                        login_data.push(session_id);
                        res.send({ "session_id": session_id});
    
                    } else {
                        res.status(500);
                        res.send("error");
                    }
    
                });
            }
            else{
                res.status(500);
                res.send("error");
                 
            }
       //     if (err) throw err;
    
    
        });
        // bcrypt.compare("12345678","$2b$10$J/RmGbDFCcRWO1aiCWWyLe2mehqwPsiJ.yuFemHK52Rk.93VW4nIa",function(err,result){
        //     console.log(result);
        // });
    });
    
    app.post('/rest/forgot_password', (req, res) => {    
        var sql = "select email from loginusers where email= '" + req.body.email + "'";
        con.query(sql, function (err, result) {
            console.log("messaage" + result);
            if (result.length === 0) {
                res.status(500);
                res.send("email is not vaild");
            } else {
                var token = crypto.randomBytes(32).toString('hex');
                const hash = bcrypt.hash(token, 10, function (err, hashpassword) {
                    var timestamp = new Date();
                    timestamp = Date.now();
                    var new_hashpassword= btoa(hashpassword);
                    var sql = "insert into forgot_password values('" + req.body.email + "','" + hashpassword + "','" + timestamp + "','" + 0 + "')";
                    con.query(sql, function (err, result2) {
    
                        var transport = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 587,
                            secure: false,
                            requireTLS: true,
                            auth: {
                                user: creds.USER,
                                pass: creds.PASS
                            }
                        });
                        var password_reset_link = creds.Website+"/#/reset_password/" + new_hashpassword;
                        var fileread = fs.readFileSync(__dirname+'/../assets/forgot_password_templet.html', 'utf8');
                        var mailOptions = {
                            from: creds.USER,
                            to: req.body.email,
                            subject: 'otp from hasthakatha for change the password',
                            html: fileread.replace(/{password_rest_link}/g, password_reset_link)
                        }
                        transport.sendMail(mailOptions, function (err, result) {
                            if (err) {
                                res.status(500);
                                res.send('Internal server error');
                            } else {
                               
                                res.send("Mail sent succesfully");
                            }
                        })
                        // if (err) throw err;
                        // res.send(" sucess");
                    });
    
                });
    
    
            }
        });
    
    });
    
    app.post('/rest/validate_token/:token', (req, res) => {
      //  var new_token=atob(token);
        var sql = "select * from forgot_password where pass_token= '" + req.params.token + "'";
        con.query(sql, function (err, result) {
            if (result.length === 0) {
                res.status(500);
                res.send("Invaild request");
            } else {
                var timestamp = new Date();
                timestamp = Date.now();
    
                var temp = (result[0].timestamp) + 3600000;
                //    var temp2= timestamp-temp;
                if ((temp - timestamp) <= 3600000) {
                    if (req.query.token === result[0].pass_token) {
                        res.send({ "validated": true });
    
                    }
    
                }
                else {
                    res.send("token expaired");
                }
    
            }
        });
    });
    app.post('/rest/reset/:token', (req, res) => {
        var sql = "select * from forgot_password where pass_token= '" + req.params.token + "'";
        con.query(sql, function (err, result) {
            if (result.length === 0) {
                res.status(500);
                res.send("Invaild request");
            } else {
                var timestamp = new Date();
                timestamp = Date.now();
    
                var temp = (result[0].timestamp) + 3600000;
                //    var temp2= timestamp-temp;
                if ((temp - timestamp) <= 3600000) {
                    if ((req.query.token === result[0].pass_token) && (result[0].visited === 0)) {
                        var email = result[0].email;
                        const hash = bcrypt.hash(req.body.password, 10, function (err, hashpassword) {
                            var sql = "update loginusers set password='" + hashpassword + "' where email='" + email + "'";
                            con.query(sql, function (err, result3) {
                                if (err) throw err;
                                res.send(" sucess");
    
                                var sql = "update forgot_password set visited='" + 1 + "' where email='" + email + "' AND pass_token='" + req.query.token + "'";
                                con.query(sql, function (err, result4) {
                                    if (err) throw err;
                                    res.send(" sucess");
                                });
                            });
                        });
                    }
                    else {
                        res.response(500);
                        res.send("link is invalid");
                    }
    
                }
                else {
                    res.send("token expaired");
                }
    
            }
        });
    });
    
    app.get('/rest/validate_session',(req,res)=>
    {
        var session_id = req.headers.session_id;
     //   if(token==)    
        var ar = (login_data.indexOf(session_id))
        if(ar==-1)
        {
            res.status(500);
            res.send("error"); 
           
        }
        else{
            res.send("token valid");
        }
    });
}
module.exports=login_app;