import React, { Component, useEffect, useState } from 'react';
import './insertproduct.scss';
// import ImageUpload from '../../Shared/Imageupload/Imageupload'
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Insertproduct = (props) => {
    var modal;
    useEffect(() => {
        const insertproduct = document.getElementById("insertproduct");
        const elems = insertproduct.querySelectorAll('select');
        const options = {};
        var instances = M.FormSelect.init(elems, options);
    });

    const [disable, setDisable] = useState('true');

    function handleChange(e) {

        if (e.target.value != " ") {
            setDisable(false)
        }
        else {

        }
        props.setFormData({ ...props.formData, [e.target.name]: e.target.value });
    }
    return (
        <div className="row productinsertform">
            <form className="col s10" id="insertproduct" >
                <div className="row">
                    <div className="input-field  col s6">
                        <select name="category" value={props.formData.category} onChange={(e) => handleChange(e)}>
                            <option value="" disabled selected>Choose your option</option>
                            <option value="11" >Dress</option>
                            <option value="12" >Scarf</option>
                            <option value="13">Tops</option>
                            <option value="14">Pants</option>
                            <option value="15">Skirts</option>
                            <option value="16">Anklet</option>
                            <option value="17">Jumpsuit</option>
                        </select>
                        <label>Category Select<spam className="star_color">*</spam></label>
                    </div>
                    {
                        props.formData.category ?
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
                                    <label htmlFor="ptitle">Product Title<spam className="star_color">*</spam></label>
                                    <span className="helper-text" data-error="Enter product title" ></span>
                                </div>
                                <div className="input-field col s12 ">
                                    <textarea
                                        id="pdescription"
                                        value={props.formData.description}
                                        name="description"
                                        onChange={(e) => handleChange(e)}
                                        className="materialize-textarea" >
                                    </textarea>
                                    <label htmlFor="pdescription">Description<spam className="star_color">*</spam></label>
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
                                    <label htmlFor="price">Seller Price<spam className="star_color">*</spam></label>
                                    <span className="helper-text" data-error="Enter seller price"></span>
                                </div>
                                {(props.formData.category) === "16" ? '' :
                                    <div className="input-field col s6">
                                        <select value={props.formData.size} onChange={(e) => handleChange(e)} name="size" multiple>
                                            <option value="" disabled selected>Choose your option</option>
                                            <option value="1">XS</option>
                                            <option value="2">S</option>
                                            <option value="3">M</option>
                                            <option value="4">L</option>
                                            <option value="5">XL</option>
                                            <option value="6">XXL</option>
                                            <option value="7">OX</option>
                                        </select>
                                        <label>Sizes<spam className="star_color">*</spam></label>
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
                                    <label htmlFor="quantity">Quantity<spam className="star_color">*</spam></label>
                                    <span className="helper-text" data-error="Enter Quantity"></span>
                                </div>
                                <div className="input-field col s6 ">
                                    <input
                                        id="color"
                                        type="text"
                                        value={props.formData.color}
                                        className="validate"
                                        name="color"
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />
                                    <label htmlFor="color">Color<spam className="star_color">*</spam></label>
                                    <span className="helper-text" data-error="Enter color"></span>
                                </div>
                                <div className="input-field col s6">
                                    <label htmlFor="uploadimage">Upload Image<spam className="star_color">*</spam>
                                        <input
                                            id="uploadimage"
                                            type="file"
                                            className="validate"
                                            // value={formdata.image}
                                            name="image"
                                            onChange={(e) => handleChange(e)}
                                            required
                                        />
                                    </label>
                                    <span className="helper-text" data-error="Upload image"></span>
                                </div>
                                <div className="input-field col s12 ">
                                    <input
                                        id="dimension"
                                        value={props.formData.dimension}
                                        type="text"
                                        name="dimension"
                                        className="validate"
                                        onChange={(e) => handleChange(e)}
                                    />
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
                                    <input
                                        id="instruction"
                                        type="text"
                                        name="note"
                                        value={props.formData.note}
                                        className="validate"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <label htmlFor="instruction">Storage/Care Instructions</label>
                                    <span className="helper-text" data-error="Enter storage/care instructions"></span>
                                </div>
                                <div className="button col s12">
                                    {/* <a className="waves-effect waves-light btn"  onClick={(e) => onSubmit(e)} disabled={disable} >Submit</a> */}
                                    <ToastContainer />
                                </div>
                            </div>
                            : ''
                    }
                </div>
            </form>
        </div>
    );

}

export default Insertproduct;