import React from 'react';
import './Insertproduct.scss';


const Insertproduct=()=>{
    return(
       <div className="row productinsertform center">
                        <h2 className="col s8">Insert New Product</h2>
                        <form className="col s8">
                                <div className="row">
                                    <div className="input-field col s12 ">
                                        <input id="first_name" type="text" className="validate" />
                                        <label for="first_name">Product Title</label>
                                    </div>                                  
                                    <div className="input-field col s12 ">
                                        <input id="email" type="email" className="validate" />
                                        <label for="email">Seller Price</label>
                                        <span className="helper-text" data-error="wrong" data-success="right"></span>
                                    </div>
                                    <div className="input-field col s12 ">
                                        <textarea id="textarea1" className="materialize-textarea"></textarea>
                                        <label for="textarea1">Description</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <select>
                                            <option value="" disabled selected>Choose your option</option>
                                            <option value="1">Dress</option>
                                            <option value="2">Anklet</option>
                                            <option value="3">Tops</option>
                                            <option value="3">Pants</option>
                                            <option value="3">Skirts</option>
                                        </select>
                                        <label>Category</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <select multiple>
                                            <option value="" disabled selected>Choose your option</option>
                                            <option value="1">XS</option>
                                            <option value="2">S</option>
                                            <option value="3">M</option>
                                            <option value="4">L</option>
                                            <option value="5">XL</option>
                                            <option value="6">XXL</option>

                                        </select>
                                        <label>Sizes</label>
                                    </div>
                                    <div className="input-field col s12 ">
                                        <input id="email" type="text" className="validate" />
                                        <label for="email">Material</label>
                                        <span className="helper-text" data-error="wrong" data-success="right"></span>
                                    </div>
                                    <div className="input-field col s12 ">
                                        <input id="email" type="text" className="validate" />
                                        <label for="email">Storage/Care Instructions</label>
                                        <span className="helper-text" data-error="wrong" data-success="right"></span>
                                    </div>
                                    <div className="input-field col s12 ">
                                        <input id="email" type="text" className="validate" />
                                        <label for="email">Dimension</label>
                                        <span className="helper-text" data-error="wrong" data-success="right"></span>
                                    </div>
                                </div>
                                <div className="button">
                                    <a class="waves-effect waves-light btn">Submit</a>
                                </div>
                        </form>
                </div>
    );

}

export default Insertproduct;