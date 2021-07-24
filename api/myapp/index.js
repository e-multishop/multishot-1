const express = require('express')
const app = express()
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var cors = require('cors');
app.use(express.json());
const creds = require('./config');
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
const { query } = require('express');
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

app.get('/rest/colour', (req, res) => {
    var sql = "SELECT name FROM `colour` ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
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
        Promise.all(asyncoperations).then(function(ops)
            {
                    console.log(ops);
                    res.send(JSON.stringify(result));

    
            });

    });
});
//  app.get('/contact', (req, res) => {

// //    var express = require('express');
//     var router = express.Router();
   

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
app.post("/rest/addproduct",(req,res)=>{

    var pid=req.body.pid;
    var category=req.body.category;
    var title=req.body.title;
    var price=req.body.price;
    var price_without_embroidary=req.body.price_without_embroidary;
    var description=req.body.description;
    var note=req.body.note;
    var material=req.body.material;
    var total_available=req.body.total_available;
    var total_quantity=req.body.total_quantity;

    var sql= "INSERT INTO product(pid,category,title,price,price_without_embroidary,description,note,material,total_available,total_quantity)VALUES('"+pid+"','"+category+"','"+title+"','"+price+"','"+price_without_embroidary+"','"+description+"','"+note+"','"+material+"','"+total_available+"','"+total_quantity+"')";
    con.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('inserted');
    //    res.end();
    });
});

app.listen(port);
