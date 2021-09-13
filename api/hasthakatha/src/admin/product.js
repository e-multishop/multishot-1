const atob = require('atob');
const xlsx = require('xlsx');
const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./../common/models/Product');
const CommonUtil = require('./../utils/CommonUtil');
const BeanUtil = require('./../utils/BeanUtil');
const ProductUtil = require('./../utils/ProductUtil');
const ProductSql = require('../common/sql/ProductSql');

var product_app = function (app, con, hasthaBean) {
    app.get('/rest/product_list', (req, res) => {
        var sql = "SELECT * FROM product ";
        con.query(sql, function (err, result) {
            if (err) throw err;
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
                //         console.log(ops);

                res.send(JSON.stringify(result));


            });

        });
    });

 
    app.get('/rest/product_pagination/:category/:page_size/:page_number', (req, res) => {
        var category = req.params.category;
        // var chunk = req.body.pagesize;
        var page_number = parseInt(req.params.page_number);
        var page_size = parseInt(req.params.page_size);
        var offset = (page_size * (page_number - 1));
        var sql3 = `SELECT COUNT(*) FROM product where category='${category}';`;
        con.query(sql3, function (err, result3) {
            var total_record = result3[0]["COUNT(*)"];
            var sql = `SELECT * FROM product where category='${category}' LIMIT ${offset},${page_size};`;
            con.query(sql, function (err, result) {
                if (err) throw err;
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
        var description = req.body.description;
        var note = req.body.note;
        var material = req.body.material;
        var total_available = req.body.total_available;
        var total_quantity = req.body.total_quantity;
        var createdDate=req.body.createdDate;
        var updatedDate=req.body.updatedDate;
        var url = req.body.url;
        var buffer = Buffer.from(url, 'binary');
        var start = "START TRANSACTION;";
        var t1 = "INSERT INTO `product_images`(`imageid`, `pid`, `type`, `image_data`) VALUES (NULL,'" + pid + "','main','" + buffer + "');";
        var t2 = "INSERT INTO product(pid,category,title,price,price_without_embroidary,description,note,material,total_available,total_quantity,available,sku,status,createdDate,updatedDate)VALUES(NULL,'" + category + "','" + title + "','" + price + "','" + price_without_embroidary + "','" + description + "','" + note + "','" + material + "','" + total_available + "','" + total_quantity + "','" + available + "','" + sku + "','" + status + "','"+createdDate+"','"+updatedDate+"');";
        var end = "COMMIT;";
        var sql = start + t1 + t2 + end;
        console.log(sql);
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send('inserted');
            //    res.end();
        });


    });

    app.post("/rest/addproductbulk", (req, res) => {
        // read the excel file
        const workbook = xlsx.readFile(__dirname + "/../../hastha_2.xlsx");
        let data = [];

        const sheets = workbook.SheetNames;
        let query = '';
        for (let i = 0; i < sheets.length; i++) {
            const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[i]]);
            const products = [];
            sheetData.forEach(row => {
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
                    ProductUtil.getTotalAvailable(row['Total quantity'])
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
                if (err) throw err;
                res.send('success');
            });
        }
    });

    app.delete("/rest/delete", (req, res) => {

        var pid = req.body.pid;
        var t1 = "DELETE FROM product WHERE pid='" + pid + "';";
        var t2 = "DELETE FROM product_images WHERE pid='" + pid + "';"
        var sql = t1 + t2;
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send('deleted');
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
        var description = req.body.description;
        var note=req.body.note;
        var material = req.body.material;
        var total_available = req.body.total_available;
        var total_quantity = req.body.total_quantity;
        var available = req.body.available;
        var sku = req.body.sku;
        var status = req.body.status;
        var sql = "UPDATE product SET category = '" + category + "', title= '" + title + "',price ='" + price + "',price_without_embroidary='" + price_without_embroidary + "',description='" + description + "',note='" + note + "',material='" + material + "',total_available='" + total_available + "',total_quantity='" + total_quantity + "',available='" + available + "',sku='" + sku + "',status='" + status + "' WHERE pid = '" + pid + "';";
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send('updated');
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
            if (err) throw err;
            res.send('updated');
        });
    });
    app.get("/rest/add_to_cart", (req, res) => {
        var uid = req.body.uid;
        var sql = "SELECT * FROM `add_to_cart` NATURAL JOIN product"
        con.query(sql, (err, result) => {
            if (err) throw err;
            //   var pid = result[0]["pid"];
            res.send({ "output": result });
        });
    });

    app.post("/rest/add_to_cart", (req, res) => {
        var pid = req.body.pid;
        var uid = req.body.uid;
        var quantity = req.body.quantity;
        var createdDate = req.body.createdDate;
        var updatedDate = req.body.updatedDate;
        var sql = "INSERT INTO `add_to_cart`(`id`, `uid`, `pid`, `quantity`, `createdDate`, `updatedDate`) VALUES (NULL,'" + uid + "','" + pid + "','" + quantity + "','"+createdDate+"','"+updatedDate+"');";
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send('successfully add into the cart');
        });
    });

    app.put("/rest/add_to_cart", (req, res) => {
        var pid = req.body.pid;
        var uid = req.body.uid;
        var quantity = parseInt(req.body.quantity);

        var sql1 = "SELECT pid,total_available from product where pid='" + pid + "';";
        con.query(sql1, (err, result1) => {
            if (err) throw err;
            var count = result1[0]["total_available"];
            if (quantity <= count && quantity <= 10) {
                var sql = "UPDATE add_to_cart SET quantity='" + quantity + "' WHERE pid='" + pid + "' AND uid ='" + uid + "';";
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    res.send('successfully update into the cart');
                });
            }
        });
    });

    app.delete("/rest/add_to_cart", (req, res) => {

        var pid = req.body.pid;
        var uid = req.body.uid;
        var sql = "DELETE FROM add_to_cart WHERE pid='" + pid + "'AND uid ='" + uid + "';";
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send('deleted');
        });
    });

    app.get("/rest/add_to_cart_price_calculate",(req,res)=>{

        var temprorary;
        var listofobjects=[];
        
        var uid=req.body.uid;
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
                var totalAmount = listofobjects.reduce(reducer);
                res.send({"totalAmount":totalAmount,"discount":100,"tax":((totalAmount*18)/100)});


            });
        })
    });
}
module.exports = product_app;