class HasthaProduct{
    var pid;
    var sku;
    var status;
    var available;
    var category;
    var title ;
    var price ;
    var price_without_embroidary;
    var description ;
    var note;
    var material;
    var total_available;
    var total_quantity;
    var url;
    todb(){
        var t1 = "INSERT INTO `product_images`(`imageid`, `pid`, `type`, `image_data`) VALUES (NULL,'" + pid + "','main','" + buffer + "');";
        var t2 = "INSERT INTO product(pid,category,title,price,price_without_embroidary,description,note,material,total_available,total_quantity,available,sku,status)VALUES('" + pid + "','" + category + "','" + title + "','" + price + "','" + price_without_embroidary + "','" + description + "','" + note + "','" + material + "','" + total_available + "','" + total_quantity + "','" + available + "','" + sku + "','" + status + "');";
    }
}