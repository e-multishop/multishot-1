import React, { Component, useEffect, useState } from 'react';
import './insertproduct.scss';
// import ImageUpload from '../../Shared/Imageupload/Imageupload'
import { ToastContainer, toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';

const Insertproduct = (props) => {
    useEffect(() => {
        updateFormElements();
    }, [props.formData.category]);

    const [disable, setDisable] = useState('true');

    function updateFormElements() {
        const insertproduct = document.getElementById("insertproduct");
        const elems = insertproduct.querySelectorAll('select');
        const options = {};
        var instances = M.FormSelect.init(elems, options);
    }

    function handleMultiSelectChange(e) {
        var instance = M.FormSelect.getInstance(e.currentTarget);
        const values = instance.getSelectedValues();
        const isFormValid = e.target.closest('form').checkValidity();
        props.setFormData({ ...props.formData, [e.target.name]: values, valid: isFormValid});
    }

    function handleChange(e) {
        const isFormValid = e.target.closest('form').checkValidity();
        props.setFormData({ ...props.formData, [e.target.name]: e.target.value, valid: isFormValid});
        console.groupEnd();
    }
    function handleCategoryChange(e) {
        props.setFormData({ ...props.formData, [e.target.name]: e.target.value, valid: false});
        updateFormElements();
    }
    function handleImage(e){
        const isFormValid = e.target.closest('form').checkValidity();
        props.setFormValidity(isFormValid);
        let upload_image= e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(upload_image[0]);
        reader.onload=(e)=>{
            props.setUploadImage(e.target.result);
        }
    }
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'black', label: 'Black' },
        { value: 'blue', label: 'Blue' },
      ];
    return (
        <div className="row productinsertform">
            <form className="col s10" id="insertproduct" >
                <div className="row">
                    <div className="input-field  col s6">
                        <select name="category" defaultValue="" value={props.formData.category} onChange={(e) => handleCategoryChange(e)} required>
                            <option value="" disabled>Choose your option</option>
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
                    {
                        props.formData.category?
                            <div>
                                <div className="input-field col s12 ">
                                    <input
                                        id="ptitle"
                                        type="text"
                                        value={props.formData.title}
                                        name="title"
                                        onChange={(e) => handleChange(e)}
                                        className="validate" required
                                    />
                                    <label htmlFor="ptitle">Product Title<span className="star_color">*</span></label>
                                    <span className="helper-text" data-error="Enter product title" ></span>
                                </div>
                                <div className="input-field col s12 ">
                                    <input
                                        id="sku"
                                        type="text"
                                        value={props.formData.sku}
                                        name="sku"
                                        onChange={(e) => handleChange(e)}
                                        className="validate" 
                                        required
                                    />
                                    <label htmlFor="sku">SKU<span className="star_color">*</span></label>
                                    <span className="helper-text" data-error="Enter product SKU" ></span>
                                </div>
                                <div className="input-field col s12 ">
                                    <textarea
                                        id="pdescription"
                                        value={props.formData.description}
                                        name="description"
                                        onChange={(e) => handleChange(e)}
                                        className="materialize-textarea" >
                                    </textarea>
                                    <label htmlFor="pdescription">Description<span className="star_color">*</span></label>
                                </div>
                                <div className="input-field col s12 ">
                                    <input
                                        id="price"
                                        value={props.formData.price}
                                        type="number"
                                        name="price"
                                        onChange={(e) => handleChange(e)}
                                        className="validate"
                                        required
                                    />
                                    <label htmlFor="price">Seller Price<span className="star_color">*</span></label>
                                    <span className="helper-text" data-error="Enter seller price"></span>
                                </div>
                                {(props.formData.category) === "16" ? '' :
                                    <div className="input-field col s6">
                                        <select value={props.formData.size} onChange={(e) => handleMultiSelectChange(e)} name="size" multiple>
                                            <option value="" disabled selected>Choose your option</option>
                                            <option value="1">XS</option>
                                            <option value="2">S</option>
                                            <option value="3">M</option>
                                            <option value="4">L</option>
                                            <option value="5">XL</option>
                                            <option value="6">XXL</option>
                                            <option value="7">OX</option>
                                        </select>
                                        <label>Sizes<span className="star_color">*</span></label>
                                    </div>
                                }
                                <div className="input-field col s6 ">
                                    <input
                                        id="quantity"
                                        type="number"
                                        value={props.formData.total_quantity}
                                        className="validate"
                                        name="total_quantity"
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />
                                    <label htmlFor="quantity">Quantity<span className="star_color">*</span></label>
                                    <span className="helper-text" data-error="Enter Quantity"></span>
                                </div>
                                <div className="col s6 " >
                                <label htmlFor="color">Color<span className="star_color">*</span></label>
                                    <CreatableSelect className="hs-select2"
                                        isMulti
                                        // onChange={(e)=>handleChange(e)}
                                        options={options}
                                    />
                                </div>
                                <div className="input-field col s6">
                                    <label htmlFor="uploadimage">Upload Image<span className="star_color">*</span>
                                        <input
                                            id="upload_image"
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            className="validate"
                                            name="file"
                                            onChange={(e) => handleImage(e)}
                                            required
                                        />
                                    </label>
                                    <span className="helper-text" data-error="Upload image"></span>
                                </div>
                                <br/><br/>
                                <br/><br/>

                                <div className="input-field col s12 ">
                                    <textarea
                                        id="dimension"
                                        value={props.formData.dimension}
                                        name="dimension"
                                        className="materialize-textarea" 
                                        onChange={(e) => handleChange(e)}
                                    ></textarea>
                                    <label htmlFor="dimension">Dimension</label>
                                    <span className="helper-text" data-error="Enter dimension"></span>
                                </div>
                                <div className="input-field col s12 ">
                                    <input
                                        id="material"
                                        value={props.formData.material}
                                        type="text"
                                        name="material"
                                        className="validate"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <label htmlFor="material">Material</label>
                                    <span className="helper-text" data-error="Enter material"></span>
                                </div>
                                <div className="input-field col s12 ">
                                    <textarea
                                        id="instruction"
                                        name="note"
                                        value={props.formData.note}
                                        className="materialize-textarea" 
                                        onChange={(e) => handleChange(e)}
                                    ></textarea>

                                    <label htmlFor="instruction">Storage/Care Instructions</label>
                                    <span className="helper-text" data-error="Enter storage/care instructions"></span>
                                </div>
                                <div className="button col s12">
                                    <ToastContainer />
                                </div>
                            </div>
                            :''}
                </div>
            </form>
        </div>
    );

}

export default Insertproduct;