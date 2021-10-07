const CategorySql = require('./../sql/CategorySql');
const Category = require('./../models/Category');
// const AddtocartSql=require('./../sql/AddtocartSql');
// const AddtocartSql = require('./../sql/AddtocartSql');
// const Addtocart = require('./../models/Addtocart');
module.exports = class HasthaBean {
    // categoryList;
    constructor(con) {
        this.con = con;
        this.categoryList = [];
    }

    initialize() {
        // initialize category bean
        const categorySql = new CategorySql();
        const getQuery = categorySql.get();
        this.con.query(getQuery, (err, result) => {
            result.forEach(r => {
                const category = new Category(r.cid, r.name, r.description);
                this.categoryList.push(category);
            })
        });
    }

    getCategoryList() {
        return this.categoryList;
    }


    //for add_to_cart
    // constructor(con) {
    //     this.con = con;
    //     this.addtocarList = [];
    // }

    // initialize(){
    //     const addtocartSql=new AddtocartSql();
    //     const getQuery=addtocartSql.get();
    //     this.con.query(getQuery, (err, result) => {
    //         result.forEach(r => {
    //             const  add_to_cart = new Addtocart(r.id,r.uid,r.pid, r.name, r.quantity,r.created_date,r.updated_date);
    //             this.addtocarList.push(add_to_cart);
    //         })
    //     });
    // }

}