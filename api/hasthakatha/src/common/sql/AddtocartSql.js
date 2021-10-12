module.exports = class AddtocartSql {
    // Add_to_cart;
    constructor(add_to_cart) {
        this.add_to_cart = add_to_cart;
    }
    get() {
     //   return "select * from add_to_cart where uid='"+uid+"';";
        return `select * from add_to_cart where uid = '${this.add_to_cart.uid}';`;
    }
    put() {

    }
    post() {

    }
    delete() {

    }
    static async Validate(con, userId) {

        return new Promise((resolve, reject) => {
            var temprorary;
            var listofobjects=[];
            var sql ="select * from add_to_cart where uid='"+userId+"';"
            con.query(sql,(err,result)=>{
                if(err) throw err;
                let asyncoperations = [];
                for(let i=0;i<result.length;i++)
                {
                    let temp=result[i]["pid"];
                    let quantity=result[i]["quantity"]
                    let sql1 = "select price from product where pid='"+temp+"';";
                    let p = new Promise(function (resolve, reject) {
                        con.query(sql1,(err,result1)=>{
                            if(err) throw err;
                            temprorary=((result1[0]["price"])*(quantity));
                            listofobjects.push(temprorary);
                            resolve();
                        });
                        
    
                    });
                    asyncoperations.push(p);
                   
                }
                Promise.all(asyncoperations).then(function (ops) {
         
                    const reducer = (previousValue, currentValue) => previousValue + currentValue;
                    var totalAmount = listofobjects.length > 0 ? listofobjects.reduce(reducer): 0;
                    resolve(totalAmount);
                });
            });
        });
    }
}