import React, { Component, useEffect, useState } from 'react';
import '../Insertproduct';
// import ImageUpload from '../../Shared/Imageupload/Imageupload'
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';

const EditProductForm = (props) => {
    var modal;
    const [showImage, setShowImage] = useState(props.Editformdata && props.Editformdata.image_data ? true : false);
    useEffect(() => {
        const editproduct = document.getElementById("editproduct");
        const elems = editproduct.querySelectorAll('select');
        const options = {};
        var instances = M.FormSelect.init(elems, options);
    });


    function handleChange(e) {
        props.setEditFormData({ ...props.Editformdata, [e.target.name]: e.target.value });
        console.groupEnd();
    }
    function handleImage(e){
        let upload_image= e.target.files;
        if (upload_image && upload_image.length > 0) {
            let reader = new FileReader();
            reader.readAsDataURL(upload_image[0]);
            reader.onload=(e)=>{
                props.setEditUploadImage(e.target.result);
            }
            setShowImage(false);
        } else {
            setShowImage(true);
        }
    }
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];
    return (
        <div className="row productinsertform">
            <form className="col s10" id="editproduct" >
                <div className="row">
                    <div className="input-field  col s6">
                        <select name="category" value={props.Editformdata.category} onChange={(e) => handleChange(e)}>
                            <option value="" disabled selected>Choose your option</option>
                            <option value="11" >Dress</option>
                            <option value="12" >Scarf</option>
                            <option value="13">Tops</option>
                            <option value="14">Pants</option>
                            <option value="15">Skirts</option>
                            <option value="16">Anklet</option>
                            <option value="17">Jumpsuit</option>
                        </select>
                        <label>Category Select<span className="star_color">*</span></label>
                    </div>
                            <div>
                                <div className="input-field col s12 ">
                                    <input
                                        id="ptitle"
                                        type="text"
                                        value={props.Editformdata.title}
                                        name="title"
                                        onChange={(e) => handleChange(e)}
                                        className="validate" required
                                    />
                                    <label  class="active" htmlFor="ptitle">Product Title<span className="star_color">*</span></label>
                                    <span className="helper-text" data-error="Enter product title" ></span>
                                </div>
                                <div className="input-field col s12 ">
                                    <input
                                        id="sku"
                                        type="text"
                                        value={props.Editformdata.sku}
                                        name="sku"
                                        onChange={(e) => handleChange(e)}
                                        className="validate" 
                                        required
                                    />
                                    <label  class="active" htmlFor="sku">SKU<span className="star_color">*</span></label>
                                    <span className="helper-text" data-error="Enter product SKU" ></span>
                                </div>
                                <div className="input-field col s12 ">
                                    <textarea
                                        id="pdescription"
                                        value={props.Editformdata.description}
                                        name="description"
                                        onChange={(e) => handleChange(e)}
                                        className="materialize-textarea" >
                                    </textarea>
                                    <label class="active" htmlFor="pdescription">Description<span className="star_color">*</span></label>
                                </div>
                                <div className="input-field col s12 ">
                                    <input
                                        id="price"
                                        value={props.Editformdata.price}
                                        type="number"
                                        name="price"
                                        onChange={(e) => handleChange(e)}
                                        className="validate"
                                        required
                                    />
                                    <label class="active" htmlFor="price">Seller Price<span className="star_color">*</span></label>
                                    <span className="helper-text" data-error="Enter seller price"></span>
                                </div>
                                {(props.Editformdata.category) === "16" ? '' :
                                    <div className="input-field col s6">
                                        <select value={props.Editformdata.size} onChange={(e) => handleChange(e)} name="size" multiple>
                                            <option value="" disabled selected>Choose your option</option>
                                            <option value="1">XS</option>
                                            <option value="2">S</option>
                                            <option value="3">M</option>
                                            <option value="4">L</option>
                                            <option value="5">XL</option>
                                            <option value="6">XXL</option>
                                            <option value="7">OX</option>
                                        </select>
                                        <label class="active">Sizes<span className="star_color">*</span></label>
                                    </div>
                                }
                                <div className="input-field col s6 ">
                                    <input
                                        id="quantity"
                                        type="number"
                                        value={props.Editformdata.total_quantity}
                                        className="validate"
                                        name="total_quantity"
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />
                                    <label class="active" htmlFor="quantity">Quantity<span className="star_color">*</span></label>
                                    <span className="helper-text" data-error="Enter Quantity"></span>
                                </div>
                                <div className="col s6 " >
                                <label htmlFor="color">Color<span className="star_color">*</span></label>
                                    <CreatableSelect
                                        isMulti
                                        // onChange={(e)=>handleChange(e)}
                                        options={options}
                                    />
                                </div>
                                <div className="input-field col s6">
                                    <label class="active" htmlFor="uploadimage">Upload Image<span className="star_color">*</span>
                                        <input
                                            id="upload_image"
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            className="validate"
                                            name="file"
                                            onChange={(e) => handleImage(e)}
                                            required
                                        />
                                        { showImage ? <img src={props.Editformdata.image_data} width="50"/> : '' }
                                    </label>
                                    <span className="helper-text" data-error="Upload image"></span>
                                </div>
                                <br/><br/>
                                <br/><br/>

                                <div className="input-field col s12 ">
                                    <input
                                        id="dimension"
                                        value={props.Editformdata.dimension}
                                        type="text"
                                        name="dimension"
                                        className="validate"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <label class="active" htmlFor="dimension">Dimension</label>
                                    <span className="helper-text" data-error="Enter dimension"></span>
                                </div>
                                <div className="input-field col s12 ">
                                    <input
                                        id="material"
                                        value={props.Editformdata.material}
                                        type="text"
                                        name="material"
                                        className="validate"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <label class="active" htmlFor="material">Material</label>
                                    <span className="helper-text" data-error="Enter material"></span>
                                </div>
                                <div className="input-field col s12 ">
                                    <input
                                        id="instruction"
                                        type="text"
                                        name="note"
                                        value={props.Editformdata.note}
                                        className="validate"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <label class="active" htmlFor="instruction">Storage/Care Instructions</label>
                                    <span className="helper-text" data-error="Enter storage/care instructions"></span>
                                </div>
                                <div className="button col s12">
                                    <ToastContainer />
                                </div>
                            </div>
                </div>
            </form>
        </div>
    );

}

export default EditProductForm;