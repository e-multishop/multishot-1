
var order_app=function(app,con,settings)
{
    app.get('/rest/order_details/:userid/:order_id',(req,res)=>{
        var userid=req.params.userid;
        var order_id=req.params.order_id;
        var sql ="SELECT * from (SELECT * FROM transaction_detail natural join product) as T LEFT JOIN transaction as U on T.tid = U.tid WHERE U.uid= '" + userid + "' AND U.order_id='"+order_id+"';";
        con.query(sql,(err,result)=>{
            if(err)
            {
                res.status(500);
                res.send({type:"error",messsage:"Temporary Issue. Sorry we can't find order details"});
            }
            else{
                res.send({type:"success",messsage:"Order successfully shown","result":result})
            }
        });
    });

    app.post('/rest/order_generate',(req,res)=>{
        
    });

    app.get('/rest/order/list/:uid', (req, res) => {
        const sql = `SELECT * from transaction as T left join tracking_order as O on T.order_id = O.order_id where uid=${req.params.uid} ORDER BY created_date DESC`;
        con.query(sql, (err, result) => {
            if (err) {
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
                res.status(500);
                res.send({type: 'error', message: 'Temporary issue. Please contact support.', details: err})
            } else {
                res.send({type: 'success', message: '', results: {list: result[0], totalRecords: result[1][0]['count(*)']}});
            }
        });
    });
}
module.exports=order_app;