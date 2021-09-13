module.exports = class Category {
    cid;
    name;
    description;
    constructor(cid, name, description) {
        this.cid = cid;
        this.name = name;
        this.description = description;
    }
}