var atob = require('atob');
//const logger = require('./logger');
var cors = require('cors');
var ProductUtil = require('../utils/ProductUtil');
var common_app=function(app,con,logger)
{
    app.get('/rest/search', (req, res) => {
        res.header("Content-Type", 'application/json');
        // res.send(JSON.stringify(data)); });
        res.sendFile(path.resolve('search/data.json'));
    });
    
    app.get('/rest/categories', (req, res) => {
        var sql = "SELECT name, cid FROM `category`";
        con.query(sql, function (err, result) {
            if (err) logger.error(err);
            
            //logger.error(result);
        //    console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
        });
    });
    
  
    app.get('/rest/colour', (req, res) => {
        var token = req.headers.token;
        var sql = "SELECT name FROM `colour` ";
        if (token === login_data) {
            con.query(sql, function (err, result) {
                if (err) logger.error(err);
                res.setHeader("content-type", "application/json");
                res.send(JSON.stringify(result));
            });
        } else {
            logger.error(err);
            res.status(500);
            res.send("error");
        }
    
    });

    app.get('/rest/productdetails/:pid', (req, res) => {
        const productDetailSql = `select * from product as P LEFT JOIN product_images as I on P.pid = I.pid where P.pid='${req.params.pid}'`;
        con.query(productDetailSql, function (err, result) {
            if (err) logger.error(err);
            const outputData = result.length > 0 ? result[0]: {};
            if (outputData.image_data && outputData.image_data.buffer) {
                const bufferData = Buffer.from(outputData.image_data, 'binary');
                outputData.image_data = bufferData.toString();
            }
            res.send({output: outputData});
        })
    });

    app.get('/rest/productdetails/images/:pid', (req, res) => {
        const pid = req.params.pid;
        const productImagesSql = `SELECT image_data FROM product_images where pid=${pid} and type='side'`;
        con.query(productImagesSql, (err, result) => {
            if (err) {
                logger.error(err);
                res.status(500);
                res.send({type: 'error', message: 'Error fetching images', details: err});
            } else {
                res.send({type: 'success', result: ProductUtil.readImages(result)});
            }
        });
    });

    app.get('/rest/productdetails/images/main/:pid', (req, res) => {
        const pid = req.params.pid;
        const productImagesSql = `SELECT image_data FROM product_images where pid=${pid} and type='main'`;
        con.query(productImagesSql, (err, result) => {
            if (err) {
                logger.error(err);
                res.status(500);
                res.send({type: 'error', message: 'Error fetching images', details: err});
            } else {
                res.send({type: 'success', result: ProductUtil.readImages(result)});
            }
        });
    });

    app.get('/rest/productsize/:pid', (req, res) => {
        const productSizeSql = `Select id, size, S.name from product_size as P left join size as S on P.size = S.sid where pid=${req.params.pid}`;
        con.query(productSizeSql, (err, result) => {
            res.send({output: result});
        });
    });

    app.get('/rest/product_list_by_category/:category/:page_size/:page_number', (req, res) => {
        var pageSize = parseInt(req.params.page_size);
        var pageNumber = parseInt(req.params.page_number);
        var offset = (pageSize * (pageNumber - 1));
        var category = req.params.category;
        const isAllCategory = category === '0' ? true : false;
        let countSql;
        let sql;
        if (isAllCategory) {
            countSql = `SELECT COUNT(*) FROM product where 1`;
            sql = `SELECT P.pid, P.category, P.title, P.price, P.price_without_embroidary, P.description, P.note, P.material, P.total_available, P.total_quantity, P.available, P.sku, P.status, P.createdDate, P.updatedDate, I.image_data FROM product as P LEFT JOIN product_images as I on P.pid = I.pid WHERE 1 LIMIT ${offset}, ${pageSize}` ;
        } else {
            countSql = `SELECT COUNT(*) FROM product where category='${category}'`;
            sql = `SELECT P.pid, P.category, P.title, P.price, P.price_without_embroidary, P.description, P.note, P.material, P.total_available, P.total_quantity, P.available, P.sku, P.status, P.createdDate, P.updatedDate, I.image_data FROM product as P LEFT JOIN product_images as I on P.pid = I.pid WHERE P.category='${category}' LIMIT ${offset}, ${pageSize}` ;

        }
        con.query(countSql, function(err, result1){
            const totalRecords = result1[0]["COUNT(*)"];
            con.query(sql, function (err, result) {
                if (err) logger.error(err);
                res.header("Content-Type", "application/json");
                result.forEach(r => {
                    if (r.image_data && r.image_data.buffer) {
                        const buff_data = Buffer.from(r.image_data);
                        r.image_data = buff_data ? buff_data.toString() : '';
                    }
                })
                res.send({list: result, totalRecords: totalRecords});
            });
        });
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
                from: email,
                to: creds.USER,  // Change to email address that you want to receive messages on
                subject: message,
                text: content
            }
    
            transporter.sendMail({
                from: creds.USER,
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
        app.use('/', router)
    });
}
module.exports=common_app;