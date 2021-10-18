const Razorpay = require('razorpay');
const nanoId = require('nano-id');
module.exports = class OrderSql {
    
    constructor(con, settings, uid) {
        this.con = con;
        this.settings = settings;
        this.uid = uid;
    }

    async startPayment(totalAPIAmount, data) {
        const p = new Promise((resolve, reject) => {
            const key_id = this.settings.razorpay_key;
            const currency = "INR";
    
            const instance = new Razorpay({ key_id: key_id, key_secret: this.settings.razorpay_secret })
            const transaction_id = nanoId();
            const options = {
                amount: totalAPIAmount,  // amount in the smallest currency unit
                currency: currency,
                receipt: transaction_id
            };
            instance.orders.create(options, (err, order) => {
                if (err) {reject(err);}
                resolve({order, transaction_id});
            });
        });
        return Promise.resolve(p);
    }

    async recordPayment(transaction_id, order_id, totalAPIAmount, data) {
        const p = new Promise((resolve, reject) => {
            let temp = '';
            const t_status = 1;
            const created_date = (new Date()).getTime();
            const updated_date = (new Date()).getTime();
            const t2 = "INSERT INTO `transaction_detail`(`id`,`tid`, `pid`,`quantity`,`amount`) VALUES (null,'" + transaction_id + "','$pid','$quantity','$amount');";
            const t1 = "INSERT INTO `transaction`(`tid`, `order_id`, `uid`, `created_date`, `t_status`,`updated_date`, `total_amount`) VALUES ('" + transaction_id + "','" + order_id + "','" + this.uid + "','" + created_date + "','" + t_status + "','" + updated_date + "',"+totalAPIAmount+");";
            for (let i = 0; i < data.length; i++) {
                var t3 = t2.replace("$pid", data[i].pid);
                t3 = t3.replace("$quantity", data[i].quantity);
                t3 = t3.replace("$amount", data[i].price);
                temp = temp + t3;
            }
            this.con.query(t1, (error, result) => {
                if (error) { reject(error);}
                this.con.query(temp, (err, res) => {
                    if (err) {reject(err);}
                    resolve(this.settings.key_id);
                })
            })
        });
        return Promise.resolve(p);
    }

    async updatePayment(transaction_id) {
        const p = new Promise((resolve, reject) => {
            const checkTxSql = `SELECT t_status from transaction where tid=${transaction_id}`;
            this.con.query(checkTxSql, (err, result) => {
                if (err) {reject(err);}
                else if (result.length === 0) {reject('Transaction not found.')}
                else {
                    const actualResult = result[0];
                    const transactionStatus = actualResult.t_status;
                    // update transactions with INPROGRESS status to FAILURE
                    if (transactionStatus === '1') {
                        const updateTxSql = `UPDATE transaction SET t_status = 0 where tid=${transaction_id}`;
                        this.con.query(updateTxSql, (err, result2) => {
                            if (err) {reject(err);}
                            else resolve(result2);
                        });
                    }
                }
            });
        });
        return Promise.resolve(p);
    }
}