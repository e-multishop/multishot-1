const Razorpay = require('razorpay');
var nanoId = require('nano-id');
var SHA256 = require("crypto-js/hmac-sha256");

var payment_app = function (app, con,settings) {

    app.post('/rest/creating_order', (req, res) => {

        var total_amount = '500';
        var tranction_id = nanoId(16);
        var created_date = (new Date()).getTime();
        var updated_date = (new Date()).getTime();
        var data = req.body.data;
        var uid = req.body.uid;
        var quantity;
        var pid;
        var t_status = 1;
        var temp = '';
        var t2 = "INSERT INTO `transaction_detail`(`id`,`tid`, `pid`,`quantity`) VALUES (null,'" + tranction_id + "','$pid','$quantity');";
        var t1 = "INSERT INTO `transaction`(`tid`, `uid`, `created_date`, `t_status`,`updated_date`) VALUES ('" + tranction_id + "','" + uid + "','" + created_date + "','" + t_status + "','" + updated_date + "');";
        for (let i = 0; i < data.length; i++) {
            var t3 = t2.replace("$pid", data[i].pid);
            t3 = t3.replace("$quantity", data[i].quantity);
            temp = temp + t3;

        }
        //        console.log(temp);
        // con.query(sql3,(err,result2)=>{
        //     if (err) throw err;
        //     for(let i=0; i<result2.length; i++)
        //     {
        //         console.log(result2[i]["price"]);
        //     }
        //     res.send(total_amount);
        // });
        con.query(t1, (err, result1) => {
            if (err) throw err;
            con.query(temp, (err, result) => {
                if (err) throw err;
                //    res.send('inserted');
                var key_id = 'rzp_test_cprfpdDbrBfN3x';
                var currency = "INR";

                var instance = new Razorpay({ key_id: key_id, key_secret: settings.razorpay_secret })

                var options = {
                    amount: total_amount * 100,  // amount in the smallest currency unit
                    currency: currency,
                    receipt: tranction_id
                };
                instance.orders.create(options, function (err, order) {
                    console.log(order);
                    sql = "UPDATE `transaction` set `order_id`='" + order.id + "' where tid='"+tranction_id+"';";
                    //store orderid from database
                    con.query(sql,(err,result3)=>{
                        if(err){
                            res.status(500);
                            res.send({type:"error",message:"Temporary Issue. Please Contact Support", details: err});
                        }
                        else{
                            res.send({ "key_id": key_id, "amount": total_amount, "currency": currency, "name": "hasthakatha", "description": "test_transation", "order_id": order.id });
                        }
                    });

                });
            });
        })

    });

    app.post('/rest/payment_status', (req, res) => {
        var userid=req.body.userid;
        var order_id=req.body.order_id;
        var razorpay_order_id= req.body.razorpay_order_id;
        var payment_id=req.body.payment_id;
        var signature=req.body.signature;
    //    var secret=req.body.key_secret;
        var sql = "UPDATE `transaction` SET `razorpay_order_id`='" + razorpay_order_id+ "' ,`payment_id`='" +payment_id + "' where uid='"+userid+"' AND order_id='"+order_id+"';";
        
                var generated_signature = SHA256(order_id + "|" + payment_id, settings.razorpay_secret);  
                if (generated_signature == signature) 
                {   
                    con.query(sql,(err,result)=>{
                        if(err)
                        {
                            res.status(500);
                            res.send({type:"error",message:"Temporary Error. Please Contact Support. "});
                        }
                        else{
                            const deleteQuery = `DELETE FROM add_to_cart where uid='${userid}';`;
                            con.query(deleteQuery,(err, result) => {
                                if (err) {
                                    res.send({type: 'error', message: 'Temporary error. Please contact support', details: err});
                                } else {
                                    res.send({type:"success",message:"Order is successful."});  
                                }
                            })
                        } 
                    });
                }
                else{
                    res.status(500);
                    res.send({type:"error",message:"Temporary Error. Please Contact Support.", details: {
                        generatedSig: generated_signature,
                        signature: signature
                    }})
                }

            
        
    });

    app.post('/rest/payment_failure',(req,res)=>{
        var code = req.body.code;
        var description=req.body.description;
        var source = req.body.source;
        var step = req.body.step;
        var reason=req.body.reason;
        var userid = req.body.userid;
        var payment_id=req.body.payment_id;
        var sql = "UPDATE `transaction` SET `code`='" + code + "' ,`description`='" + description + "' ,`source`='" + source+ "' ,`step`='" +step+ "' ,`reason`='" +reason+ "' where uid='"+userid+"' AND order_id='"+order_id+"';";
        con.query(sql,(err,result)=>{
            if(err)
            {
                res.status(500);
                res.send({type:"error",message:"Temporary Error. Please Contact Support."})
            }
            else{
                    res.send({type:"success",message:"inserted"});
            }
        })
    });

}
module.exports = payment_app;