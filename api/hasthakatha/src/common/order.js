
var order_app=function(app,con,settings)
{
    app.get('/rest/order_deails/:userid/:order_id',(req,res)=>{
        var userid=req.params.userid;
        var order_id=req.params.order_id;
        var sql ="select * from transaction_detail as T LEFT JOIN transaction as U on T.tid = U.tid WHERE U.uid= '" + userid + "' AND U.order_id='"+order_id+"';";
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
}
module.exports=order_app;