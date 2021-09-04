import React from 'react'
import { NavLink } from 'react-router-dom'
import "./checkout.scss";
import Checkout_card from "./Checkout_card"
import Checkout_card_item from "./Checkout_card_item"

function Checkout() {
    return (
        <div className="hk-container">
            <div className="header-checkout">
                    <h2>1 items in your basket</h2>
                    <NavLink to="/shop" className="keep-shopping">
                    Keep Shopping
                    </NavLink>
            </div>
            <div className="row">
                <div className="col s8">
                    <Checkout_card_item/>
                    <Checkout_card_item/>
                </div>
                <div className="col s4">
                    <Checkout_card/>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
