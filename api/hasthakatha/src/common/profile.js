
var profile_app=function(app,con){
    
    app.get('/rest/county_detail',(req,res)=>{
        var sql ="select * from country;";
        con.query(sql,(err,result)=>{
            if(err)
            {
                res.status(500);
                res.send({type:"error",messsage:"Temporary Issue. Sorry we can't find country details"});
            }
            else{
                res.send({type:"success",messsage:"Now you show list of all country","result":result})
            }
        })
    });
    app.post('/rest/address',(req,res)=>{
        var address = req.body.address;
        var id=req.body.id;
        var userid=req.body.userid;
        var name=req.body.name;
        var country = req.body.country;
        var address1=req.body.address1;
        var city=req.body.city;
        var state=req.body.state;
        var pincode=req.body.pincode;
        var phone = req.body.phone;
        var created_date=(new Date()).getTime();
        var updated_date=(new Date()).getTime();
        var sql= "INSERT INTO `shipping_address`( `id`,`uid`,`country`,`name`,`address`,`address1`,`city`,`state`,`pincode`,`phone`, `created_date`,`updated_date`) VALUES (NULL,'" + uid + "','"+country+"','"+name+"','" + address+ "','"+address1+"','"+city+"','"+state+"','"+pincode+"','"+phone+"','" + created_date  + "','" + updated_date + "');";
        con.query(sql,(err,result)=>{
            if(err){
                res.status(500);
                res.send({type:"error",messsage:"Address does not inserted. Please re-enter"});
            }
            else{
                res.send({type:"success",message:"Address inserted"});
            }
        })
    });
    app.put('/rest/address',(req,res)=>{
        var userid=req.body.userid;
        var id =req.body.id;
        var name =req.body.name;
        var address=req.body.address;
        var address1=req.body.address1;
        var country=req.body.country;
        var city=req.body.city;
        var state=req.body.state;
        var pincode=req.body.pincode;
        var phone=req.body.phone;
        var updated_date=(new Date()).getTime();
        var sql="UPDATE `shipping_address` SET `country`='"+country+"',`name`='"+name+"',`address`='" + address+ "' ,`address1`='"+address1+"',`city`='"+city+"',`state`='"+state+"',`pincode`='"+pincode+"',`phone`='"+phone+"',`updated_date`='" +updated_date + "' where uid='"+userid+"' AND id='"+id+"';";
        con.query(sql,(err,result)=>{
            if(err)
            {
                res.status(500);
                res.send({type:"error",message:"Temporary Error.Shipping address not updated"});
            }
            else
            {
                res.send({type:"success",message:"Shipping address updated"});
            }
        })
    });

    app.delete('/rest/address/:userid/:id',(req,res)=>{
        var userid = req.params.userid;
        var id=req.params.id;
        var sql="DELETE FROM shipping_address where userid='"+userid+"' AND id='"+id+"';";
        con.query(sql,(err,result)=>{
            if(err)
            {
                res.status(500);
                res.send({type:"error",message:"Temporary Error. Address is not deleted"});
            }
            else{
                res.send({type:"success",message:"Address deleted"});
            }
        })
    });

    app.get('/rest/address_list/:userid/:id',(req,res)=>{
        var userid = req.params.userid;
        var id=req.params.id;
        var sql="select * from shipping_address where userid='"+userid+"' AND id='"+id+"';";
        con.query(sql,(err,result)=>{
            if(err)
            {
                res.status(500);
                res.send({type:"error",message:"Temporary Error.Address doesn't shown"});
            }
            else{
                res.send({type:"success",message:"Shown the all list of data","result":result});
            }
        });
    });
}
module.exports=profile_app;