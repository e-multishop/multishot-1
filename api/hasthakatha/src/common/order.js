//const logger = require('./logger');
var order_app=function(app,con,settings,logger)
{
    app.get('/rest/order_details/:userid/:order_id',(req,res)=>{
        var userid=req.params.userid;
        var order_id=req.params.order_id;
        var sql ="SELECT * from (SELECT P1.pid, P1.title, P1.price, P1.description,T1.quantity,T1.size,T1.color,T1.tid FROM product as P1 left join transaction_detail as T1 on P1.pid=T1.pid) as T LEFT JOIN transaction as U on T.tid = U.tid WHERE U.uid= '" + userid + "' AND U.order_id='"+order_id+"';";
        con.query(sql,(err,result)=>{
            if(err)
            {
                res.status(500);
                logger.error(err);
                res.send({type:"error",messsage:"Temporary Issue. Sorry we can't find order details"});
            }
            else{
                res.send({type:"success",messsage:"Order successfully shown","result":result})
            }
        });
    });

    app.post('/rest/tracking/:orderID', (req, res) => {
        const orderID = req.params.orderID;
        const deliveryDate = req.body.deliveryDate;
        const trackingNumber = req.body.trackingNumber;
        const trackingQuery = `UPDATE tracking_order set tracking_number='${trackingNumber}', delivery_date='${deliveryDate}', delivery_status = 2 where order_id = '${orderID}'`;
        con.query(trackingQuery, (err, result) => {
            if (err) {
                logger.error(err);
                res.status(500);
                res.send({type:"error",messsage:"Please contact support", detail: err});
            } else {
                res.send({type: 'success',message: 'Delivery updated successfully'});
            }
        });
    });

    app.post('/rest/delivery/:orderID', (req, res) => {
        const orderID = req.params.orderID;
        const deliveredDate = req.body.deliveredDate;
        const deliveredNote = req.body.deliveredNote;
        const deliveryQuery = `UPDATE tracking_order set delivered_date='${deliveredDate}', delivered_note='${deliveredNote}', delivery_status = 3 where order_id = '${orderID}'`;
        con.query(deliveryQuery, (err, result) => {
            if (err) {
                logger.error(err);
                res.status(500);
                res.send({type:"error",messsage:"Please contact support", detail: err});
            } else {
                res.send({type: 'success',message: 'Delivery updated successfully'});
            }
        });
    });

    app.post('/rest/order_generate',(req,res)=>{
        
    });

    app.get('/rest/order/list/:uid', (req, res) => {
        const sql = `SELECT * from transaction as T left join tracking_order as O on T.order_id = O.order_id where uid=${req.params.uid} ORDER BY created_date DESC`;
        con.query(sql, (err, result) => {
            if (err) {
                logger.error(err);
                res.status(500);
                res.send({type: 'error', message: 'Temporary issue. Please contact support.'})
            } else {
                res.send(result);
            }
        });
    });

    app.get('/rest/order/list/:pageNumber/:pageSize', (req, res) => {
        const pageSize = parseInt(req.params.pageSize);
        const pageNumber = parseInt(req.params.pageNumber);
        const offset = (pageSize * (pageNumber - 1));
        const sql = `SELECT * from transaction as T left join tracking_order as O on T.order_id = O.order_id where 1 ORDER BY created_date DESC LIMIT ${offset}, ${pageSize};`;
        const countSql = `SELECT count(*) from transaction`;
        con.query(sql+countSql, (err, result) => {
            if (err) {
                logger.error(err);
                res.status(500);
                res.send({type: 'error', message: 'Temporary issue. Please contact support.', details: err})
            } else {
                res.send({type: 'success', message: '', results: {list: result[0], totalRecords: result[1][0]['count(*)']}});
            }
        });
    });
}
module.exports=order_app;