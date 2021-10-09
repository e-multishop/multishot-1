var review_app = function (app, con) {
    app.get('/rest/reviews/:pid', (req, res) => {
        var pid = req.params.pid;
        var sql = "select * from reviews  LEFT JOIN review_images ON reviews.rid = review_images.rid where pid='" + pid + "'; "
        con.query(sql, (err, result) => {
            if (err) {
                res.status(500);
                res.send({ type: "error", message: "Temporary error, We can't featch reviews" });
            }
            else {
                res.send({"result":result});
            }
        })
    });

    app.post('/rest/reviews', (req, res) => {
        var pid = req.body.pid;
        var userid = req.body.userid;
        var rating = req.body.rating;

        var description = req.body.description;
        var created_date = (new Date()).getTime();
        var updated_date = (new Date()).getTime();
        var image_data = req.body.image_data;
        var sql = "INSERT INTO `reviews`( `rid`,`uid`,`pid`,`rating`,`description`,`created_date`,`updated_date`) VALUES (NULL,'" + userid + "','"+pid+"','" + rating + "','" + description + "','" + created_date + "','" + updated_date + "');";
        con.query(sql, (err, result) => {
            if (err) {
                res.status(500);
                res.send({ type: "error", message: "Temporary error, We can't featch reviews",details:err });
            }
            else {
                var sql1 = "select rid from reviews where uid='" + userid + "' AND pid='" + pid + "';";
                con.query(sql1, (err, result1) => {
                    if (err) {
                        res.status(500);
                        res.send({ type: "error", message: "Temporary error, We can't featch reviews",details:err });
                    }
                    else {

                        var rid = result1[0]["rid"];

                        // var sql2 = "";
                        var temp = "";
                        var t2 = "INSERT INTO `review_images`(`img_id`,`rid`,`image_data`) VALUES (null,'" + rid + "','$image_data','$quantity');";
                        for (let i = 0; i < data.length; i++) {
                            var t2 = t2.replace("$image_data", data[i].image_data);
                            temp = temp + t2;

                        }
                        con.query(temp, (err, result3) => {
                            if (err) {
                                res.status(500);
                                res.send({ type: "error", message: "Temporary error, We can't featch reviews",details:err });
                            }
                            else {
                                res.send({ type: "success", message: "Data inserted successfully" });
                            }
                        })
                    }

                })
               
            }
        })
    })

}
module.exports=review_app;