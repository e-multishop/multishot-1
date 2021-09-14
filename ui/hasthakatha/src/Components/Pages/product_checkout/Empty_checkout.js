import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './checkout.scss';
import { NavLink } from 'react-router-dom';

function Empty_checkout() {
    return (
        <div className="empty-checkout">
            <div className="empty-checkout-content">
                <FontAwesomeIcon icon={faShoppingCart} size="6x" className="icon " />
                <h2>Your HasthaKatha Basket is empty</h2>
                <NavLink to="/shop">Shop today's deals</NavLink>
            </div>
        </div>
    );
}

export default Empty_checkout;
