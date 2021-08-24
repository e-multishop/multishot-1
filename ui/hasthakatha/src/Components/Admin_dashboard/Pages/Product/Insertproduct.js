import React, { Component, useEffect, useState } from 'react';
import './Insertproduct.scss';
// import ImageUpload from '../../Shared/Imageupload/Imageupload'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Insertproduct = () => {
    useEffect(() => {
        const insertproduct = document.getElementById("insertproduct");
        const elems = insertproduct.querySelectorAll('select');
        const options = {};
        var instances = M.FormSelect.init(elems, options);
    });
    const [disable, setDisable] = useState('true');
    const [formdata, setFormdata] = useState({
        category: "",
        title: " ",
        price: " ",
        price_without_embroidary: " ",
        description: " ",
        note: " ",
        material: " ",
        size: " ",
        total_available: " ",
        total_quantity: " ",
        image: " ",
        dimension: " ",
        color: " ",

    });
    function handleChange(e) {

        if (e.target.value != " ") {
            setDisable(false)
        }
        else {
            // setDisable(false)
        }
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        // console.log(formdata)
    }
    function onSubmit(e) {       
        Axios.post("/rest/addproduct", {
            pid :"Hkp53"+1,
            category :formdata.category,
            title :formdata.title,
            price :formdata.price,
            price_without_embroidary :"89",
            description :formdata.description,
            note :formdata.note,
            material :formdata.material,
            total_available :"89",//89-demo data
            total_quantity : formdata.total_quantity,
        }
        ).then(res => {
            console.log(res.formdata)
            toast.success("Success")
    
        }).catch(err =>{
            console.log(err)
            toast.error("Data did not inserted")
    });
        // document.getElementById("insertproduct").reset();
        // {html: 'I am a toast!'}
    }

    return (
        <div className="admin-center">
            <div className="row productinsertform">
                <form className="col s8" id="insertproduct" >
                    <h2>Add New Product</h2>
                    <div className="row">
                        <div className="input-field  col s6">
                            <select name="category" value={formdata.category} onChange={(e) => handleChange(e)}>
                                <option value="" disabled selected>Choose your option</option>
                                <option value="11">Dress</option>
                                <option value="12">Scarf</option>
                                <option value="13">Tops</option>
                                <option value="14">Pants</option>
                                <option value="15">Skirts</option>
                                <option value="16">Anklet</option>
                                <option value="17">Jumpsuit</option>
                            </select>
                            <label>Category Select<spam className="star_color">*</spam></label>
                        </div>
                        {
                            formdata.category ?
                                <div>
                                    <div className="input-field col s12 ">
                                        <input
                                            id="ptitle"
                                            type="text"
                                            value={formdata.title}
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
                                            value={formdata.description}
                                            name="description"
                                            onChange={(e) => handleChange(e)}
                                            className="materialize-textarea" >
                                        </textarea>
                                        <label htmlFor="pdescription">Description<spam className="star_color">*</spam></label>
                                    </div>
                                    <div className="input-field col s12 ">
                                        <input
                                            id="price"
                                            value={formdata.price}
                                            type="number"
                                            name="price"
                                            onChange={(e) => handleChange(e)}
                                            className="validate"
                                            required
                                        />
                                        <label htmlFor="price">Seller Price<spam className="star_color">*</spam></label>
                                        <span className="helper-text" data-error="Enter seller price"></span>
                                    </div>
                                    {(formdata.category) === "16" ? '' :
                                        <div className="input-field col s6">
                                            <select multiple value={formdata.size} onChange={(e) => handleChange(e)} name="size">
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
                                            value={formdata.total_quantity}
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
                                            value={formdata.color}
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
                                            value={formdata.dimension}
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
                                            value={formdata.material}
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
                                            value={formdata.note}
                                            className="validate"
                                            onChange={(e) => handleChange(e)}
                                        />
                                        <label htmlFor="instruction">Storage/Care Instructions</label>
                                        <span className="helper-text" data-error="Enter storage/care instructions"></span>
                                    </div>
                                    <div className="button col s12">
                                        <a className="waves-effect waves-light btn"  onClick={(e) => onSubmit(e)} disabled={disable} >Submit</a>
                                        <ToastContainer />
                                    </div>
                                </div>
                                : ''
                        }
                    </div>
                </form>
            </div>
        </div>
    );

}

export default Insertproduct;