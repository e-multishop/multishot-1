const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var cors = require('cors');
app.use(express.json());
const creds = require('./config');
app.use(express.static(__dirname + '/public')); //Serves resources from public folder
app.use(express.json());
app.use(cors())
const bcrypt = require('bcrypt');
const crypto = require('crypto');
var login_data=[];
//const xlsxFile = require('read-excel-file/node');
const xlsx = require('xlsx');
const fs = require('fs');
var jwt_key =" secret";
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
app.get('/rest/search', (req, res) => {
    res.header("Content-Type", 'application/json');
    // res.send(JSON.stringify(data)); });
    res.sendFile(path.resolve('search/data.json'));
});

app.get('/rest/categories', (req, res) => {
    var sql = "SELECT name FROM `category`";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

app.post('/rest/signup', (req, res) => {
    var sql = "select email from loginusers where email= '" + req.body.email + "'";
    con.query(sql, function (err, result) {
        console.log("messaage" + result);
        if (result.length === 0) {
            const hash = bcrypt.hash(req.body.password, 10, function (err, hashpassword) {
                console.log(hashpassword);
                var sql = "insert into loginusers values(null,'','" + req.body.email + "','" + hashpassword + "')";
                con.query(sql, function (err, result2) {
                    if (err) throw err;
                    res.send(" sucess");
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
    var sql = "select * from loginusers where email= '" + req.body.email + "'";
    con.query(sql, function (err, result) {
        if (result != null && result.length == 1) {

            bcrypt.compare(req.body.password, result[0].password, function (err, result2) {
                if (result2 === true) {
                    const token = jwt.sign(
                        {
                            email: result[0].email,
                            userId:result[0].id
                        },
                        jwt_key,
                        {
                            expiresIn: "1h"   
                        }
                    );
                    login_data.push(token);
                    res.send({"token":token});
                
                } else {
                    res.status(500);
                    res.send("error");
                }

            });
        }
        else{
            res.status(500);
            res.send("email id not found")
        }
        // if (err) throw err;


    });
    // bcrypt.compare("12345678","$2b$10$J/RmGbDFCcRWO1aiCWWyLe2mehqwPsiJ.yuFemHK52Rk.93VW4nIa",function(err,result){
    //     console.log(result);
    // });
});

app.post('/rest/forgot_password',(req,res)=>{
    
    var sql = "select email from loginusers where email= '" + req.body.email + "'";
    con.query(sql, function (err, result) {
        console.log("messaage" + result);
        if (result.length === 0) {
            res.status(500);
            res.send("email is not vaild");
        } else 
            {
               var token = crypto.randomBytes(32).toString('hex');
                const hash = bcrypt.hash(token,10, function (err, hashpassword) 
                {
                    var timestamp=new Date();
                    timestamp=Date.now();
                    var sql="insert into forgot_password values('"+req.body.email+"','"+hashpassword+"','"+timestamp+"','"+0+"')";
                    con.query(sql, function (err, result2) {

                        var transport=nodemailer.createTransport({
                            host:'smtp.gmail.com',
                            port:587,
                            secure:false,
                            requireTLS:true,
                            auth:{
                                user:creds.USER,
                                pass: creds.PASS
                            }
                        });
                        var password_reset_link="http://localhost:3000/#/reset_password/"+hashpassword;
                        var fileread=  fs.readFileSync('./forgot_password_templet.html', 'utf8');
                        var mailOptions={
                            from:creds.USER,
                            to: req.body.email,
                            subject:'otp from hasthakatha for change the password',
                            html: fileread.replace(/{password_rest_link}/g,password_reset_link)
                        }
                        transport.sendMail(mailOptions,function(err,result){
                            if(err){
                                res.send('err');
                            }else{
                                res.send("mail send succesfully");
                            }
                        })
                        if (err) throw err;
                            res.send(" sucess");
                    });
                   
                });

                
            }
    });    
  
});

app.post('/rest/validate_token',(req,res)=>{
    var sql = "select * from forgot_password where pass_token= '" + req.query.token + "'";
    con.query(sql, function(err,result)
    {
        if (result.length === 0) {
            res.status(500);
            res.send("Invaild request");
        }else{
            var timestamp=new Date();
            timestamp=Date.now();

            var temp = (result[0].timestamp)+3600000;
        //    var temp2= timestamp-temp;
            if((temp-timestamp)<=3600000)
            {
                if(req.query.token===result[0].pass_token)
                {
                   res.send({"validated":true}); 
                      
                }
                 
            }
            else{
                res.send("token expaired");
            }
           
        }
    });
});

app.post('/rest/reset',(req,res)=>{
    var sql = "select * from forgot_password where pass_token= '" + req.query.token + "'";
    con.query(sql, function(err,result)
    {
        if (result.length === 0) {
            res.status(500);
            res.send("Invaild request");
        }else{
            var timestamp=new Date();
            timestamp=Date.now();

            var temp = (result[0].timestamp)+3600000;
        //    var temp2= timestamp-temp;
            if((temp-timestamp)<=3600000)
            {
                if((req.query.token===result[0].pass_token) && (result[0].visited===0))
                {
                    var email=result[0].email;
                    const hash = bcrypt.hash(req.body.password, 10, function (err, hashpassword) {
                        var sql = "update loginusers set password='"+hashpassword+"' where email='"+email+"'";
                        con.query(sql, function (err, result3) {
                            if (err) throw err;
                                res.send(" sucess");

                            var sql = "update forgot_password set visited='"+1+"' where email='"+email+"' AND pass_token='"+req.query.token+"'";
                            con.query(sql, function (err, result4) {
                                if (err) throw err;
                                    res.send(" sucess");
                            });
                        });
                    });   
                }
                else{
                        res.response(500);
                        res.send("link is invalid");
                }
                 
            }
            else{
                res.send("token expaired");
            }
           
        }
    });
});
app.get('/rest/insert_data',(req,res)=>{
//     xlsxFile('./Final_File.xlsx', { getSheets: true }).then((sheets) => {
//       sheets.forEach((obj)=>{
//             console.log(obj.name);
//        })
//    })
        console.log(__dirname+"/ash.xlsx");
        const workbook = xlsx.readFile(__dirname+"/ash.xlsx");
        
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        console.log(worksheet);
        var cellAsString;
        const posts = [];
        let post ={};
        for(let cell in worksheet)
        {
             cellAsString = cell.toString();
             console.log(cellAsString);
        }
        console.log(cellAsString);
        if(cellAsString[1] !== 'r' && cellAsString !=='m' && cellAsString[1] > 1)
        {
            if(cellAsString[0] === 'A')
            {
                post.title = worksheet[cell].v;
            }
            if(cellAsString[0] === 'B')
            {
                post.author = worksheet[cell].v;
            }
            if(cellAsString[0] === 'C')
            {
                post.released = worksheet[cell].v;
                posts.push(post);
                post = {};
            }
        }
        console.log(posts);
});
app.get('/rest/colour', (req, res) => {
    var token= req.headers.token;
    var sql = "SELECT name FROM `colour` ";
    if(token===login_data)
    {
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.setHeader("content-type","application/json");
            res.send(JSON.stringify(result));
        });
    }else{
        res.status(500);
        res.send("error");
    }
   
});

app.get('/rest/product', (req, res) => {
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
        Promise.all(asyncoperations).then(function (ops) {
            console.log(ops);
            res.send(JSON.stringify(result));


        });

    });
});
app.get('/contact', (req, res) => {

    //    var express = require('express');
    var router = express.Router();


    var transport = {
        host: 'ashish.volksdigitallab@gmail.com', // Don’t forget to replace with the SMTP host of your provider
        //    port: 587,
        auth: {
            user: creds.USER,
            pass: creds.PASS
        }
    }

    var transporter = nodemailer.createTransport(transport)

    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take messages');
        }
    });

    router.post('/send', (req, res, next) => {
        var name = req.body.name
        var email = req.body.email
        var message = req.body.message
        var content = `name: ${name} \n email: ${email} \n message: ${message} `

        var mail = {
            from: name,
            to: 'RECEIVING_EMAIL_ADDRESS_GOES_HERE',  // Change to email address that you want to receive messages on
            subject: 'New Message from Contact Form',
            text: content
        }

        transporter.sendMail({
            from: "<your email address>",
            to: email,
            subject: "Submission was successful",
            text: `Thank you for contacting us!\n\nForm details\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
        }, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    })

    //    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use('/', router)
    // app.listen(3002)




    var transport = {
        host: 'ashish.volksdigitallab@gmail.com', // Don’t forget to replace with the SMTP host of your provider
        //    port: 587,
        auth: {
            user: creds.USER,
            pass: creds.PASS
        }
    }

    var transporter = nodemailer.createTransport(transport)

    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take messages');
        }
    });

    router.post('/send', (req, res, next) => {
        var name = req.body.name
        var email = req.body.email
        var message = req.body.message
        var content = `name: ${name} \n email: ${email} \n message: ${message} `

        var mail = {
            from: name,
            to: 'RECEIVING_EMAIL_ADDRESS_GOES_HERE',  // Change to email address that you want to receive messages on
            subject: 'New Message from Contact Form',
            text: content
        }

        transporter.sendMail({
            from: "<your email address>",
            to: email,
            subject: "Submission was successful",
            text: `Thank you for contacting us!\n\nForm details\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
        }, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    })

    //    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use('/', router)
    // app.listen(3002)


});

//     var transport = {
//     host: 'ashishmaurya9452@gmail.com', // Don’t forget to replace with the SMTP host of your provider
// //    port: 587,
//         auth: {
//             user: creds.USER,
//             pass: creds.PASS
//         }
//     }

//     var transporter = nodemailer.createTransport(transport)

//     transporter.verify((error, success) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Server is ready to take messages');
//         }
//     });

//     router.post('/send', (req, res, next) => {
//         var name = req.body.name
//         var email = req.body.email
//         var message = req.body.message
//         var content = `name: ${name} \n email: ${email} \n message: ${message} `

//         var mail = {
//             from: name,
//             to: 'RECEIVING_EMAIL_ADDRESS_GOES_HERE',  // Change to email address that you want to receive messages on
//             subject: 'New Message from Contact Form',
//             text: content
//         }

//         transporter.sendMail({
//             from: "<your email address>",
//             to: email,
//             subject: "Submission was successful",
//             text: `Thank you for contacting us!\n\nForm details\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
//         }, function(error, info){
//                 if(error) {
//                     console.log(error);
//                 } else{
//                     console.log('Message sent: ' + info.response);
//                 }
//             });
//         })

// //    const app = express()
//     app.use(cors())
//     app.use(express.json())
//     app.use('/', router)
//    // app.listen(3002)


// });
app.post("/rest/addproduct", (req, res) => {

    var pid = req.body.pid;
    var category = req.body.category;
    var title = req.body.title;
    var price = req.body.price;
    var price_without_embroidary = req.body.price_without_embroidary;
    var description = req.body.description;
    var note = req.body.note;
    var material = req.body.material;
    var total_available = req.body.total_available;
    var total_quantity = req.body.total_quantity;

    var sql = "INSERT INTO product(pid,category,title,price,price_without_embroidary,description,note,material,total_available,total_quantity)VALUES('" + pid + "','" + category + "','" + title + "','" + price + "','" + price_without_embroidary + "','" + description + "','" + note + "','" + material + "','" + total_available + "','" + total_quantity + "')";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send('inserted');
        //    res.end();
    });
});
app.listen(port);
