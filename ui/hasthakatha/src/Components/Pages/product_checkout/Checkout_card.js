import React,{useEffect,useState} from 'react'
import "./checkout.scss"
import Axios from 'axios';

function Checkout_card(props) {
    return (
        <>
            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">PRICE DETAILS</span>
                            <div className="hk-card-action card-price-section">
                                <p>Price</p>
                                <p>₹{props.data.totalAmount}</p>
                            </div>
                            <div className="hk-card-action card-price-section">
                                <p>Tax</p>
                                <p>₹{props.data.tax}</p>
                            </div>
                            <div className="hk-card-action card-price-section">
                                <p>Discount</p>
                                <p>-₹{props.data.discount}</p>
                            </div>
                            <div className="hk-card-action card-price-section">
                                <p>Delivary Charges</p>
                                <p className="green-text">FREE</p>
                            </div>
                            <div className="hk-card-action card-price-section card-total-amount">
                                <p>Total Amount</p>
                                <p>₹{props.data.totalAmount}</p>
                            </div>
                            {/* <div className="hk-checkout-button" >
                                <p onClick={()=>{props.handleSubmit()}}>Checkout</p>
                            </div> */}
                            <p className="center-align">
                                Local taxes included (where applicable)<br />
                        * Additional duties and taxes may apply</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout_card;
