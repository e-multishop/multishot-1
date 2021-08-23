
var product_app = function (app,con) {
    app.get('/rest/product_list', (req, res) => {
        var sql = "SELECT * FROM product ";
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
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.send("data insert successfully");
        });
    });

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
}
module.exports=product_app;