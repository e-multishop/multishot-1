import React from 'react'
import "./checkout.scss"

function Checkout_card() {
    return (
        <>

            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">PRICE DETAILS</span>
                            <div className="hk-card-action card-price-section">
                                <p>Price</p>
                                <p>₹500</p>
                            </div>
                            <div className="hk-card-action card-price-section">
                                <p>Discount</p>
                                <p>-₹100</p>
                            </div>
                            <div className="hk-card-action card-price-section">
                                <p>Delivary Charges</p>
                                <p className="green-text">Free</p>
                            </div>
                            <div className="hk-card-action card-price-section card-total-amount">
                                <p>Total Amount</p>
                                <p>₹400</p>
                            </div>
                            <div className="hk-checkout-button" >
                                <a>Checkout</a>
                            </div>
                            <p className="center-align ">
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
