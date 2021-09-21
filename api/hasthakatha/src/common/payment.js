const Razorpay = require('razorpay');
var nanoId = require('nano-id');

var payment_app = function (app, con) {

    app.post('/rest/creating_order', (req, res) => {

        var total_amount = parseInt(req.body.amount);
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
        con.query(t1,(err,result1)=>{
            if (err) throw err;
            con.query(temp, (err, result) => {
                if (err) throw err;
            //    res.send('inserted');
                var key_id='rzp_test_cprfpdDbrBfN3x';
                var currency="INR";

                var instance = new Razorpay({ key_id:key_id, key_secret: 'UdhvSLqrzcMK9h3PLFv7lDFT' })
    
                var options = {
                    amount: total_amount * 100,  // amount in the smallest currency unit
                    currency: currency,
                    receipt: tranction_id
                };
                instance.orders.create(options, function (err, order) {
                    console.log(order);
                    res.send({"key_id":key_id,"amount":total_amount,"currency":currency,"name":"hasthakatha","description":"test_transation","order_id":order.id})
                });
            });
        })
       
    });

}
module.exports = payment_app;