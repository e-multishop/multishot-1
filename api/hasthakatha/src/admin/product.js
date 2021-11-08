const atob = require('atob');
const btoa = require('btoa');
const xlsx = require('xlsx');
const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./../common/models/Product');
const CommonUtil = require('./../utils/CommonUtil');
const BeanUtil = require('./../utils/BeanUtil');
const ProductUtil = require('./../utils/ProductUtil');
const ProductSql = require('../common/sql/ProductSql');

var product_app = function (app, con, hasthaBean,logger) {
    app.get('/rest/product_list/:page_size/:page_number', (req, res) => {
        var pageSize = parseInt(req.params.page_size);
        var pageNumber = parseInt(req.params.page_number);
        var offset = (pageSize * (pageNumber - 1));
        var countSql = `SELECT COUNT(*) FROM product`;
        var sql = `SELECT P.pid, P.category, P.title, P.price, P.price_without_embroidary, P.description, P.note, P.material, P.total_available, P.total_quantity, P.available, P.sku, P.status, P.createdDate, P.updatedDate, I.image_data FROM product as P LEFT JOIN product_images as I on P.pid = I.pid LIMIT ${offset}, ${pageSize}` ;
        con.query(countSql, function(err, result1){
            const totalRecords = result1 && result1.length > 0 ? result1[0]["COUNT(*)"] : 0;
            con.query(sql, function (err, result) {
                if (err) logger.error(err);
                res.header("Content-Type", "application/json");
                const resultWithoutDuplicates = [];
                result.forEach(r => {
                    const match = resultWithoutDuplicates.find(r2 => r2.pid === r.pid);
                    if (!match) {
                        resultWithoutDuplicates.push(r);
                    }
                });
                resultWithoutDuplicates.forEach(r => {
                    if (r.image_data && r.image_data.buffer) {
                        const buff_data = Buffer.from(r.image_data);
                        r.image_data = buff_data ? buff_data.toString() : '';
                    }
                })
                res.send({list: resultWithoutDuplicates, totalRecords: totalRecords});
            });
        });
    });

 
    app.get('/rest/product_pagination/:category/:page_size/:page_number', (req, res) => {
        var category = req.params.category;
        var page_number = parseInt(req.params.page_number);
        var page_size = parseInt(req.params.page_size);
        var offset = (page_size * (page_number - 1));
        var sql3 = `SELECT COUNT(*) FROM product where category='${category}';`;
        con.query(sql3, function (err, result3) {
            var total_record = result3[0]["COUNT(*)"];
            var sql = `SELECT * FROM product where category='${category}' LIMIT ${offset},${page_size};`;
            con.query(sql, function (err, result) {
                if (err) logger.error(err);
                res.header("Content-Type", "application/json");

                let asyncoperations = [];
                let images = [];
                for (var k = 0; k < result.length; k++) {
                    let temp = result[k].pid;
                    let sql = "SELECT pid,type,image_data from `product_images` WHERE pid='" + temp + "'";
                    //     let sql = `SELECT pid,type,url from product_images WHERE pid='${temp}'`;
                    let p = new Promise(function (resolve, reject) {
                        con.query(sql, function (err, result2) {
                            // console.log(result2[i].url);
                            images = images.concat(result2);
                            for (var i = 0; i < result.length; i++) {
                                for (var j = 0; j < images.length; j++) {
                                    var temp = result[i];
                                    if (temp.pid == images[j].pid) {
                                        var image_data = images[j].image_data;
                                        console.log(Object.keys(image_data));
                                        var buff_data = image_data ? Buffer.from(image_data) : '';

                                        temp.image_data = buff_data ? buff_data.toString() : '';

                                    }
                                }

                            }
                            resolve();
                        })
                    });
                    asyncoperations.push(p);
                }
                Promise.all(asyncoperations).then(function (ops) {
                    var temprorary;
                    var listofobjects=[];
                    temprorary ={list:result,total_record:(total_record)}
                    listofobjects.push(temprorary);
                    console.log(listofobjects);
                    res.send(JSON.stringify(listofobjects));
                });

            });
        });

    });


    app.get('/rest/insert_data', (req, res) => {

        const workbook = xlsx.readFile(__dirname + "/ash.xlsx");
        let data = [];

        const sheets = workbook.SheetNames;

        for (let i = 0; i < sheets.length; i++) {
            const temp = xlsx.utils.sheet_to_json(
                workbook.Sheets[workbook.SheetNames[i]])
            temp.forEach((res) => {
                data.push(res)
            })
        }
        console.log(data);
    });
    
    app.get('/rest/sample', (req, res) => {
        var table = ["product", "product_size"]
        var arr = [{ pid: "hek110", category: "11", title: "Orange-Green Thread Anklet", price: "150", price_without_embroidary: "0", description: "Handmade thread anklet adorned with with beautiful bells.", note: "Length: 9.5", material: "Polyester, cotton", total_available: "1", total_quantity: "26" },
        { pid: "hek111", category: "12", title: "Blue-Black Thread Anklet", price: "150", price_without_embroidary: "0", description: "Handmade thread anklet adorned with with beautiful bells.", note: "Length: 9.5", material: "Polyester, cotton", total_available: "1", total_quantity: "2" },
        { pid: "hek112", category: "13", title: "Pink-Brown Thread Anklet", price: "150", price_without_embroidary: "0", description: "Handmade thread anklet adorned with with beautiful bells.", note: "Length: 10.0", material: "cotton", total_available: "1", total_quantity: "25" },
        { pid: "hek113", category: "14", title: "Yellow-Black Thread Anklet", price: "150", price_without_embroidary: "0", description: "Handmade thread anklet adorned with with beautiful bells.", note: "Length: 9.0", material: "Polyester, cotton", total_available: "1", total_quantity: "26" }];

        var temp = "";
        for (let i = 0; i < arr.length; i++) {
            var row = arr[i];
            var pid = row.pid;
            var category = row.category;
            var title = row.title;
            var price = row.price;
            var price_without_embroidary = row.price_without_embroidary;
            var description = row.description;
            var note = row.note;
            var material = row.material;
            var total_available = row.total_available;
            var total_quantity = row.total_quantity;
            var message = `'${pid}','${category}','${title}','${price}','${price_without_embroidary}','${description}','${note}','${material}','${total_available}','${total_quantity}'`;
            var sql = `insert into product values(${message});`;
            temp = temp + sql;
        }
        console.log(temp);
        // con.query(sql, function (err, result) {
        //     if (err) throw err;
        //     res.send("data insert successfully");
        // });
    });

    app.post("/rest/addproduct", (req, res) => {

        var pid = req.body.pid;
        var sku = req.body.sku;
        var status = req.body.status;
        var available = req.body.available;
        var category = req.body.category;
        var title = req.body.title;
        var price = req.body.price;
        var price_without_embroidary = req.body.price_without_embroidary;
        var description = req.body.description ? btoa(req.body.description) : '';
        var note = req.body.note;
        var material = req.body.material;
        var total_available = req.body.total_available;
        var total_quantity = req.body.total_quantity;
        var createdDate=req.body.createdDate;
        var updatedDate=req.body.updatedDate;
        var url = req.body.url;
        var size = req.body.size;
        var buffer = Buffer.from(url, 'binary');
        var createdDate = (new Date()).getTime();
        var updatedDate = (new Date()).getTime();
        var start = "START TRANSACTION;";
        var t1 = "INSERT INTO `product_images`(`imageid`, `pid`, `type`, `image_data`) VALUES (NULL,'" + pid + "','main','" + buffer + "');";
        var t2 = "INSERT INTO product(pid,category,title,price,price_without_embroidary,description,note,material,total_available,total_quantity,available,sku,status,createdDate,updatedDate)VALUES(" + pid + ",'" + category + "','" + title + "','" + price + "','" + price_without_embroidary + "','" + description + "','" + note + "','" + material + "','" + total_available + "','" + total_quantity + "','" + available + "','" + sku + "','" + status + "','"+createdDate+"','"+updatedDate+"');";
        var sizeQuery = '';
        if (size && size.length > 0 && size.forEach) {
            size.forEach(s => {
                sizeQuery = sizeQuery ?  sizeQuery + `,(NULL,'${pid}','${s}')` : `(NULL,'${pid}','${s}')`;
            });
        }
        var t3 = `INSERT INTO \`product_size\`(\`id\`, \`pid\`, \`size\`) VALUES ${sizeQuery};`;
        var end = "COMMIT;";
        var sql = start + t1 + t2 + (sizeQuery ? t3 : '') + end;
        console.log(sql);
        con.query(sql, (err, result) => {
            if (err) logger.error(err);
            res.send('inserted');
            //    res.end();
        });


    });

    app.post("/rest/addproductimage/:pid", (req, res) => {
        const pid = req.params.pid;
        var image1 = req.body.image1 ? Buffer.from(req.body.image1, 'binary') : '';
        var image2 = req.body.image2 ? Buffer.from(req.body.image2, 'binary') : '';
        var image3 = req.body.image3 ? Buffer.from(req.body.image3, 'binary') : '';
        var image4 = req.body.image4 ? Buffer.from(req.body.image4, 'binary') : '';
        var image5 = req.body.image5 ? Buffer.from(req.body.image5, 'binary') : '';
        let addImageSql = '';
        if (image1) {
            addImageSql += "INSERT INTO `product_images`(`imageid`, `pid`, `type`, `image_data`) VALUES (NULL,'" + pid + "','side','" + image1 + "');";
        }
        if (image2) {
            addImageSql += "INSERT INTO `product_images`(`imageid`, `pid`, `type`, `image_data`) VALUES (NULL,'" + pid + "','side','" + image2 + "');";
        }
        if (image3) {
            addImageSql += "INSERT INTO `product_images`(`imageid`, `pid`, `type`, `image_data`) VALUES (NULL,'" + pid + "','side','" + image3 + "');";
        }
        if (image4) {
            addImageSql += "INSERT INTO `product_images`(`imageid`, `pid`, `type`, `image_data`) VALUES (NULL,'" + pid + "','side','" + image4 + "');";
        }
        if (image5) {
            addImageSql += "INSERT INTO `product_images`(`imageid`, `pid`, `type`, `image_data`) VALUES (NULL,'" + pid + "','side','" + image5 + "');";
        }
        if (addImageSql) {
            con.query(addImageSql, (err, result) => {
                if (err) {
                    logger.error(err);
                    res.status(500);
                    res.send({type: 'error', message: 'Error adding images'});
                } else {
                    res.send({type: 'success', message:'Images added successfully'});
                }
            });
        }
        else {
            res.status(400);
            res.send({type: 'error'});
        }
    });

    app.post("/rest/addproductbulk", (req, res) => {
        // read excel file from body
        const excelFileBody = req.body.data;
        let sheets = '';
        let workbook;
        if (excelFileBody) {
            try {
                // read the excel file from request body
                const decoded = atob(excelFileBody);
                const convertArray = new Uint8Array(decoded);
                workbook = xlsx.read(decoded, {type: 'binary'});
                sheets = workbook.SheetNames;
                // read the excel file from file system
                // const workbook = xlsx.readFile(__dirname + "/../../hastha_2.xlsx");
            } catch(e) {
                console.log('error' + e);
                logger.error(e);
                res.status(500);
                res.send({type: 'error', message: e});
                return;
            }
        } else {
            logger.error(err);
            res.status(500);
            res.send({type: 'error', message: 'Error reading file'});
        }
        let query = '';
        for (let i = 0; i < sheets.length; i++) {
            const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[i]]);
            const products = [];
            sheetData.forEach(row => {
                const currentTime = (new Date()).getTime();
                products.push(new Product(
                    '', 
                    CommonUtil.getData(row['SKU']), 
                    1, 
                    1, 
                    BeanUtil.getCategoryIDFromName(hasthaBean.getCategoryList(), CommonUtil.getData(row['Category'])), 
                    CommonUtil.getData(row['Product Title']), 
                    ProductUtil.getProductPrice(row['Seller Price']), 
                    ProductUtil.getProductPrice(row['Seller Price']), 
                    ProductUtil.getProductDescription(row['Description']), 
                    '', 
                    CommonUtil.getData(row['Material']), 
                    ProductUtil.getTotalAvailable(row['Total quantity']),
                    ProductUtil.getTotalAvailable(row['Total quantity']),
                    currentTime,
                    currentTime
                ));
            });
            products.forEach((p) => {
                const productSql = new ProductSql(p);
                query += productSql.post();
            });
        }
        if (query) {
            const queryWithTransaction = "START TRANSACTION;" + query + "COMMIT;"
            con.query(queryWithTransaction, (err, result) => {
                if (err) logger.error(err);
                res.send('success');
            });
        } else {
            logger.error(err);
            res.status(500);
            res.send('Empty file/Error reading file');
        }
    
    });

    app.delete("/rest/product/:pid", (req, res) => {
        const pid = req.params.pid;
        var t1 = "DELETE FROM product WHERE pid='" + pid + "';";
        var t2 = "DELETE FROM product_images WHERE pid='" + pid + "';"
        var sql = t1 + t2;
        con.query(sql, (err, result) => {
            if (err) {
                logger.error(err);
                res.status(500);
                res.send({type: 'error', message: 'Error deleting product, please contact support.'})
            }
            else {
                res.send({type: 'success', message: 'Deleted successfully'});
            }
        });
    });
    app.get("/rest/get_pid", (req, res) => {
        var sql = "SELECT MAX(pid) FROM product;";
        con.query(sql, (err, result) => {
            if (err) throw err;
            var count = result[0]["MAX(pid)"];
            //console.log(count);
            if (count == "null") {
                res.send({ "pid": 1 });
            } else {
                count = count + 1;
                res.send({ "pid": count });
            }

        });
    });
    
    app.put("/rest/update", (req, res) => {
        var pid = req.body.pid;
        var category = req.body.category;
        var title = req.body.title;
        var price = req.body.price;
        var price_without_embroidary = req.body.price_without_embroidary;
        var description = req.body.description ? btoa(req.body.description) : '';
        var note=req.body.note;
        var material = req.body.material;
        var total_available = req.body.total_available;
        var total_quantity = req.body.total_quantity;
        var available = req.body.available;
        var sku = req.body.sku;
        var status = req.body.status;
        var image_data = req.body.image_data;
        var image_data_changed = req.body.image_data_changed;
        var updatedDate = (new Date()).getTime();
        var size = req.body.size && req.body.size.length > 0 ? req.body.size.join(','): '';
        var sql = "UPDATE product SET category = '" + category + "', title= '" + title + "',price ='" + price + "',price_without_embroidary='" + price_without_embroidary + "',description='" + description + "',note='" + note + "',material='" + material + "',total_available='" + total_available + "',total_quantity='" + total_quantity + "',available='" + available + "',sku='" + sku + "',status='" + status + "',updatedDate='" + updatedDate + "',size='" + size + "' WHERE pid = '" + pid + "';";
        con.query(sql, (err, result) => {
            if (err) throw err;
            if (image_data_changed && image_data) {
                const imageQuery = `SELECT count(*) from product_images WHERE pid='${pid}'`;
                con.query(imageQuery, (err, result3) => {
                    const imageBufferData = Buffer.from(image_data, 'binary');
                    let imageSQLQuery = '';
                    if (result3[0]['count(*)'] === 0) {
                        imageSQLQuery = `INSERT into product_images(imageid, pid, type, image_data) values(NULL, '${pid}', 'main', '${imageBufferData}')`;
                    } else {
                        imageSQLQuery = "UPDATE product_images SET image_data ='"+imageBufferData+"' WHERE pid="+pid+";"
                    }
                    con.query(imageSQLQuery, (err, result2) =>{
                        if (err) {
                            res.status(500);
                            res.send({type: 'error', message: 'Error updating image'});
                        } else {
                            res.send({type: 'success', message:'Product updated'});
                        }
                    })
                });
            } else {
                res.send({type: 'success', message:'Product updated'});
            }
        });
    });
    app.put("/rest/update_status", (req, res) => {
        var pid = req.body.pid;
        var status = req.body.status;
        var sql = "UPDATE product SET status='" + status + "' Where pid='" + pid + "';";
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send('updated');
        });
    });

    app.put("/rest/update_available", (req, res) => {
        var pid = req.body.pid;
        var available = req.body.available;
        var sql = "UPDATE product SET available='" + available + "' Where pid='" + pid + "';";
        con.query(sql, (err, result) => {
            if (err) logger.error(err);
            res.send('updated');
        });
    });

    app.get("/rest/add_to_cart/:uid", (req, res) => {
        var uid = req.params.uid;
        var sql = "SELECT A.id,A.pid,A.quantity,A.createdDate,A.color,A.size,P.title,P.price,P.description,I.image_data FROM `add_to_cart` AS A LEFT JOIN product as P ON A.pid=P.pid LEFT JOIN product_images as I ON P.pid=I.pid where I.type='main' and A.uid='"+uid+"'; ";
        con.query(sql, (err, result) => {
            if (err) throw err;
             res.header("Content-Type", "application/json");
                result.forEach(r => {
                    if (r.image_data && r.image_data.buffer) {
                        const buff_data = Buffer.from(r.image_data);
                        r.image_data = buff_data ? buff_data.toString() : '';
                    }
                })
            res.send({ "output": result });
        });
    });

    app.post("/rest/add_to_cart", (req, res) => {
        var pid = req.body.pid;
        var uid = req.body.uid;
        var color = req.body.color ? parseInt(req.body.color) : -1;
        var size = req.body.size ? parseInt(req.body.size) : -1;
        var quantity = req.body.quantity;
        var createdDate = (new Date()).getTime();
        var updatedDate = createdDate;
        var existingMatchesSql = `SELECT id, quantity from add_to_cart where uid=${uid} and pid=${pid}`;
        con.query(existingMatchesSql, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500);
                res.send({type: 'error', message: 'Temporary Error. Please contact support.'});
            } else {
                if (result && result.length > 0) {
                    const existingQuanitity = parseInt(result[0]['quantity']);
                    const updateSql = `UPDATE add_to_cart set quantity=${existingQuanitity+1}, color=${color}, size=${size} where pid=${pid} and uid=${uid}`;
                    con.query(updateSql, (err, result) => {
                        if (err) {
                            console.error(err);
                            res.status(500);
                            res.send({type: 'error', message: 'Temporary error. Please contact support.'});
                        } else {
                            res.send({type: 'success', message: 'Cart updated successfully'});
                        }
                    });
                } else {
                    const insertSql = "INSERT INTO `add_to_cart`(`id`, `uid`, `pid`, `quantity`, `color`, `size`,`createdDate`, `updatedDate`) VALUES (NULL,'" + uid + "','" + pid + "','" + quantity + "',"+color+","+size+",'"+createdDate+"','"+updatedDate+"');";
                    con.query(insertSql, (err, result) => {
                        if (err) {
                            res.status(500);
                            res.send({type: 'error', message: 'Temporary error. Please try again later.', details: err});
                        } else {
                            res.send({type: 'success', message: 'Successfully add into the cart'});
                        }
                    });
                }
            }
        });
        
    });

    app.put("/rest/add_to_cart", (req, res) => {
        var pid = req.body.pid;
        var uid = req.body.uid;
        var quantity = parseInt(req.body.quantity);
        var color = req.body.color ? parseInt(req.body.color): -1;
        var size = req.body.size ? parseInt(req.body.size) : -1;
        var sql1 = "SELECT pid,total_available from product where pid='" + pid + "';";
        con.query(sql1, (err, result1) => {
            if (err) throw err;
            var count = result1[0]["total_available"];
            if (quantity <= count && quantity <= 10) {
                var sql = "UPDATE add_to_cart SET quantity='" + quantity + "', color=" + color + ", size='" + size + "' WHERE pid='" + pid + "' AND uid ='" + uid + "';";
                con.query(sql, (err, result) => {
                    if (err) { 
                        res.status(500);
                        logger.error(err);
                        res.send({type: 'error', message: "Error updating cart. Please try again later", details: err});
                    } else {
                        res.send('successfully update into the cart');
                    }
                });
            }
        });
    });

    app.delete("/rest/add_to_cart/:id", (req, res) => {

        var id= req.params.id;
        var sql = "DELETE FROM add_to_cart WHERE id='" + id + "';";
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send('deleted');
        });
    });

    app.get("/rest/add_to_cart/number_of_items/:uid",(req,res)=>{
        var uid=req.params.uid;
        var sql="select count(*) from add_to_cart where uid='"+uid+"';"
        con.query(sql,(err,result)=>{
            if(err) {
                logger.error(err);
                res.status(500);
                res.send({type: 'error', message: 'Temporary error. Contact support', details: err});
            } else {
                var number_of_items = result && result.length > 0 ? result[0]["count(*)"] : 0;
                res.send({"number_of_items":number_of_items});
            }
        })
    })

    app.get("/rest/add_to_cart_price_calculate/:uid",(req,res)=>{

        var temprorary;
        var listofobjects=[];        
        var uid=req.params.uid;
        var sql ="select * from add_to_cart where uid='"+uid+"';"
        con.query(sql,(err,result)=>{
            if(err) throw err;
            let asyncoperations = [];
            for(let i=0;i<result.length;i++)
            {
                let temp=result[i]["pid"];
                let quantity=result[i]["quantity"]
                let sql1 = "select price from product where pid='"+temp+"';";
                let p = new Promise(function (resolve, reject) {
                    con.query(sql1,(err,result1)=>{
                        if(err) throw err;
                        temprorary=((result1[0]["price"])*(quantity));
                        listofobjects.push(temprorary);
                        resolve();
                    });
                    

                });
                asyncoperations.push(p);
               
            }
            Promise.all(asyncoperations).then(function (ops) {
     
                const reducer = (previousValue, currentValue) => previousValue + currentValue;
                var totalAmount = listofobjects.length > 0 ? listofobjects.reduce(reducer): 0;
                res.send({"totalAmount":totalAmount,"discount":totalAmount ? 100: 0,"tax":((totalAmount*18)/100)});


            });
        })
    });
    // app.get('/rest/best_selling',(req,res)=>{
    //     var sql= "SELECT * FROM transaction_detail ORDER BY pid ASC;";
    //     con.query(sql,(err,result)=>{
    //         let temp=result[0]["pid"];
    //         let sum=0;
    //         const products = new Map();
    //         for(let i=0; i<result.length; i++)
    //         {
    //             if((result[i]["pid"])==temp)
    //             {
    //                 sum=sum+result[i]["quantity"];
    //             }
    //             else{
    //                 products.set(temp,sum);
    //                 temp=result[i]["pid"];
    //                 sum=0;
    //             }
    //         }
    //         products.set(temp,sum);
    //         console.log([...products.entries()]);
    //         //shorting
    //         //get result 
    //     })
    // });
}
module.exports = product_app;