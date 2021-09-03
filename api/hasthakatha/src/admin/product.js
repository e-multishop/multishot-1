var atob = require('atob');
var product_app = function (app, con) {
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
    app.get('/rest/product_pagination', (req, res) => {
        var category=req.body.category; 
        var chunk = req.body.pagesize;
        var sql = "SELECT * FROM product where category='"+category+"';";
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
                 var i, j=1, temporary;
                 var listOfObjects = [];
                 console.log(result.length);
                 for (i = 0; i < result.length; ) {
                      
                      temporary = {list: result.slice(i, i + chunk),total_record:((result.length)/chunk),page:(j)};
                      listOfObjects.push(temporary);
                     // console.log(temporary);
                    i=i+chunk;
                    j++;
                  }
                  console.log(listOfObjects);
                  res.send(JSON.stringify( listOfObjects));


            });

        });
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
        var url = req.body.url;
        var buffer = Buffer.from(url, 'binary');
        var start = "START TRANSACTION;";
        var t1 = "INSERT INTO `product_images`(`imageid`, `pid`, `type`, `image_data`) VALUES (NULL,'" + pid + "','main','" + buffer + "');";
        var t2 = "INSERT INTO product(pid,category,title,price,price_without_embroidary,description,note,material,total_available,total_quantity,available,sku,status)VALUES('" + pid + "','" + category + "','" + title + "','" + price + "','" + price_without_embroidary + "','" + description + "','" + note + "','" + material + "','" + total_available + "','" + total_quantity + "','" + available + "','" + sku + "','" + status + "');";
        var end = "COMMIT;";
        var sql = start + t1 + t2 + end;
        console.log(sql);
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send('inserted');
            //    res.end();
        });


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
    // app.post("/rest/add_to_cart", (req, res) => {

    // });
}
module.exports = product_app;