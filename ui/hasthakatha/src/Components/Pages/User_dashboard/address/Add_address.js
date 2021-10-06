import React,{useEffect} from 'react'
import Header from '../../../Header/Header';
import Footer from '../../../Footer/Footer';
import { faOtter } from '@fortawesome/free-solid-svg-icons';

function Add_address() {
    useEffect(()=>{
        const country = document.getElementById("country");
        const elems = country.querySelectorAll('select');
        const options = {};
        var instances = M.FormSelect.init(elems, options);
    });

    return (
        <>
            <Header />
            <div className="add-address-section">
                <div className="add-address-form">
                    <h2>Add a new address</h2>
                    <div >
                        <form className="col s12" id="country">
                            <div className="hk-formcontent">
                                <div className="row">
                                    <div class="input-field col s12">
                                        <select name="country">
                                            {/* <option value="" disabled selected>Choose your option</option> */}
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                            <option value="3">Option 3</option>
                                        </select>
                                        <label>Country/Region</label>
                                    </div>
                                    <div className="input-field col s12 ">
                                        <input id="full_name" type="text" className="validate" />
                                        <label for="full_name">Full Name (First and Last Name)</label>
                                    </div>
                                    <div className="input-field col s12 ">
                                        <textarea id="Address" className="materialize-textarea"></textarea>
                                        <label for="Address">Address</label>
                                        <span class="helper-text" data-error="wrong" data-success="right">
                                            Street address,P.O. box,company name,apartement,building,etc.
                                        </span>

                                    </div>
                                    <div className="input-field col s12 ">
                                        <input id="city" type="text" className="validate" />
                                        <label for="city">City/District/Town</label>
                                    </div>
                                    <div className="input-field col s12 ">
                                        <input id="state" type="text" className="validate" />
                                        <label for="state">State / Province / Region</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input id="mobile_number" type="number" className="validate" />
                                        <label for="mobile_number">Mobile Number</label>
                                    </div>
                                    <div className="input-field col s12 ">
                                        <input id="pincode" type="number" className="validate" />
                                        <label for="pincode">Pincode/Zipcode</label>
                                    </div>

                                </div>
                                <div className="button">
                                    <a class="waves-effect waves-light btn btn-color">Add address</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Add_address;
