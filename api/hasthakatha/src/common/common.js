var atob = require('atob');
var cors = require('cors');
var common_app=function(app,con)
{
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
        var token = req.headers.token;
        var sql = "SELECT name FROM `colour` ";
        if (token === login_data) {
            con.query(sql, function (err, result) {
                if (err) throw err;
                res.setHeader("content-type", "application/json");
                res.send(JSON.stringify(result));
            });
        } else {
            res.status(500);
            res.send("error");
        }
    
    });

    // app.post('/rest/product_images',(req,res)=>{
    //     var url =req.body.image_data;
    //     var buffer =  Buffer.from(url, 'binary');
    //     var sql= "INSERT INTO `product_images`(`imageid`, `pid`, `type`, `url`, `image_data`) VALUES ('ek2','hk02','mm','dd','"+buffer+"');"; 
    //     con.query(sql, function (err, result) {
    //         if (err) throw err;
    //         res.send("data insert successfully");
    //     });    
    // });
    
    
    
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
}
module.exports=common_app;