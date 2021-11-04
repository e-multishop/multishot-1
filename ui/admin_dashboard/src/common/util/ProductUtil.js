export default class ProductUtil {
    static updateProductData(productData) {
        if (productData) {
            productData.forEach(p => {
                if (p.description) {
                    try {
                        p.description = atob(p.description);
                    } catch {
                        console.error('error on product description data')
                    }
                }
            })
        }
    }
    static uploadImage(e, setImage) {
        let upload_image= e.target.files;
        if (upload_image && upload_image.length > 0) {
            const imageSize = e.target.files[0].size;
            const imageSizeInMb = imageSize/1024;
            if (imageSizeInMb <= 1024) {
                let reader = new FileReader();
                reader.readAsDataURL(upload_image[0]);
                reader.onload=(e)=>{
                    setImage(e.target.result);
                }
            } else {
                e.target.value = '';
                toast.warn('Image size should be lesser than 1 MB.');
            }
        }
    }
}