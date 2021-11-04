const Razorpay = require('razorpay');
var nanoId = require('nano-id');
var SHA256 = require("crypto-js/hmac-sha256");
const AddtocartSql = require('./sql/AddtocartSql');
const TransactionSql = require('./sql/TransactionSql');
var getTotalPrice = async function() {

}
var payment_app = function (app, con,settings,logger) {

    app.post('/rest/creating_order', async (req, res) => {
        // get amount from ui and validate the amount
        const totalUiAmount = req.body.amount;
        var uid = req.body.uid;
        const deliveryType = req.body.deliveryType;
        const shippingAddress = req.body.deliveryAddress;
        const totalAPIAmount = await AddtocartSql.Validate(con, uid);
        // validate total amount
        if (totalUiAmount === totalAPIAmount) {
            var data = req.body.data;
            const transaction = new TransactionSql(con, settings, uid);
            try { 
                const {order, transaction_id} = await transaction.startPayment(totalAPIAmount);
                //store orderid from database
                const key_id = await transaction.recordPayment(transaction_id, order.id, totalAPIAmount, data, {deliveryType, shippingAddress});
                res.send({type: 'success', "key_id": key_id, "amount": totalAPIAmount, "currency": order.currency, "name": "hasthakatha", "description": "test_transation", "order_id": order.id });
                const razorpayTimeout = settings.razorpay_payment_timeout;  // in seconds
                const razorPayTimeout_ms = razorpayTimeout*1000; // in milliseconds
                // update payment status after a timeout
                setTimeout(() => {
                    transaction.updatePayment(transaction_id);
                }, razorPayTimeout_ms);
            } catch(e) {
                logger.error(err);
                res.status(500);
                res.send({type:"error",message:"Temporary Issue. Please Contact Support", details: e});
            }
        } else {
            logger.error(err);
            res.status(500);
            res.send({type: 'error', message: 'Internal server error. Please contact support.'})
        }
    });

    app.post('/rest/payment_status', (req, res) => {
        var userid=req.body.userid;
        var order_id=req.body.order_id;
        var razorpay_order_id= req.body.razorpay_order_id;
        var payment_id=req.body.payment_id;
        var signature=req.body.signature;
    //    var secret=req.body.key_secret;
        var sql = "UPDATE `transaction` SET `t_status`=2, `razorpay_order_id`='" + razorpay_order_id+ "' ,`payment_id`='" +payment_id + "' where uid='"+userid+"' AND order_id='"+order_id+"';";
        
                var generated_signature = SHA256(order_id + "|" + payment_id, settings.razorpay_secret);  
                if (generated_signature == signature) 
                {   
                    con.query(sql,(err,result)=>{
                        if(err)
                        {
                            logger.error(err);
                            res.status(500);
                            res.send({type:"error",message:"Temporary Error. Please Contact Support. "});
                        }
                        else{
                            const deleteQuery = `DELETE FROM add_to_cart where uid='${userid}';`;
                            con.query(deleteQuery,(err, result) => {
                                if (err) {
                                    logger.error(err);
                                    res.send({type: 'error', message: 'Temporary error. Please contact support', details: err});
                                } else {
                                    res.send({type:"success", message:"Order is successful."});  
                                }
                            })
                        } 
                    });
                }
                else{
                    res.status(500);
                    logger.error(err);
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
                logger.error(err)
                res.status(500);

                res.send({type:"error",message:"Temporary Error. Please Contact Support."})
            }
            else {
                res.send({type:"success",message:"inserted"});
            }
        })
    });




}


module.exports = payment_app;