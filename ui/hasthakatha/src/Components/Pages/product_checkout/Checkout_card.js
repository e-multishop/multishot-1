import React,{useEffect,useState} from 'react'
import "./checkout.scss"
import Axios from 'axios';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Checkout_card(props) {
    return (
        <>
            <div class="row">
                <div class="col s12">
                    <div class="card hs-min-height-300 hs-no-shadow">
                        <div class="card-content hs-checkout-section">
                            <span class="card-title"><FontAwesomeIcon icon={faShoppingBag} size="large" className="icon slide-out" /> Your Order Summary</span>
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
