import React,{useEffect, useState} from 'react'
import Header from '../../../Header/Header';
import Footer from '../../../Footer/Footer';
import axios from 'axios';
import {toast} from 'react-toastify';

function Add_address() {
    const [countryList, setCountryList] = useState([]);
    const [countryDetail, setCountryDetail] = useState({
        name: '',
        address: '',
        address1: '',
        country: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        uid: localStorage.getItem('userId')
    });
    const initializeSelect = () => {
        const country = document.getElementById("country");
        const elems = country.querySelectorAll('select');
        const options = {};
        var instances = M.FormSelect.init(elems, options);
    }
    useEffect(()=>{
        initializeSelect();
        axios.get('/rest/county_detail').then(res => {
            setCountryList(res.data.result);
            initializeSelect();
        });
    }, []);

    const addAddress = () => {
        axios.post('/rest/address', countryDetail).then(res => {
            toast.success('Address added successfully');
        });
    };

    const setDetail = (e) => {
        const value = e.target.value;
        setCountryDetail({...countryDetail, [e.target.name]: value})
    }; 

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
                                        <select name="country" onChange={setDetail}>
                                            <option value="" disabled selected>Choose your option</option>
                                            {
                                            countryList.map((c,i) => {
                                                return (
                                                    <option key={i} value={c.id}>{c.name}</option>
                                                )
                                            })
                                            }
                                        </select>
                                        <label>Country/Region</label>
                                    </div>
                                    <div className="input-field col s12 ">
                                        <input id="full_name" type="text" className="validate" onChange={setDetail}/>
                                        <label for="full_name">Full Name (First and Last Name)</label>
                                    </div>
                                    <div className="input-field col s12 ">
                                        <textarea id="Address" className="materialize-textarea" name="address" onChange={setDetail}></textarea>
                                        <label for="Address">Address</label>
                                        <span class="helper-text" data-error="wrong" data-success="right">
                                            Street address,P.O. box,company name,apartement,building,etc.
                                        </span>

                                    </div>
                                    <div className="input-field col s12 ">
                                        <input id="city" type="text" className="validate" name="city" onChange={setDetail}/>
                                        <label for="city">City/District/Town</label>
                                    </div>
                                    <div className="input-field col s12 ">
                                        <input id="state" type="text" className="validate" name="state" onChange={setDetail}/>
                                        <label for="state">State / Province / Region</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input id="mobile_number" type="number" name="phone" className="validate" onChange={setDetail}/>
                                        <label for="mobile_number">Mobile Number</label>
                                    </div>
                                    <div className="input-field col s12 ">
                                        <input id="pincode" type="number" className="validate" name="pincode" onChange={setDetail}/>
                                        <label for="pincode">Pincode/Zipcode</label>
                                    </div>

                                </div>
                                <div className="button">
                                    <a class="waves-effect waves-light btn btn-color" onClick={addAddress}>Add address</a>
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
