module.exports = class Addtocart {
    constructor(id, uid, pid, quantity, created_date, updated_date) {
        this.id = id;
        this.uid = uid;
        this.pid = pid;
        this.quantity = quantity;
        this.created_date = created_date;
        this.updated_date = updated_date;
    }
}