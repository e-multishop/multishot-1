import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserCircle } from '@fortawesome/free-solid-svg-icons'

function Sidebar() {
    return (
        <>
            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">
                                <FontAwesomeIcon icon={faUserCircle} size='2x' className="icon" />
                                    SHIV PRASAD
                            </span>
                            <div className="hk-card-action card-price-section">
                                <p>Price</p>
                            </div>
                            <div className="hk-card-action card-price-section">
                                <p>Tax</p>
                            </div>
                            <div className="hk-card-action card-price-section">
                                <p>Discount</p>
                            </div>
                            <div className="hk-card-action card-price-section">
                                <p>Delivary Charges</p>
                                <p className="green-text">FREE</p>
                            </div>
                            <div className="hk-card-action card-price-section card-total-amount">
                                <p>Total Amount</p>
                            </div>
                            <div className="hk-checkout-button" >
                                <a>Checkout</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
