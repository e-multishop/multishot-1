module.exports = class ProductImage {
    
    pid;
    image_data;

    constructor(pid, image_data) {
        this.pid = pid;
        this.image_data = image_data;
    }

    toSql() {
        return "INSERT INTO `product_images`(`imageid`, `pid`, `type`, `image_data`) VALUES (NULL,'" + pid + "','main','" + buffer + "');";
    }
  
}