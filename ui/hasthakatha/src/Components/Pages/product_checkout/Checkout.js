import React from 'react'
import { NavLink } from 'react-router-dom'
import "./checkout.scss";
import Checkout_card from "./Checkout_card"
import Checkout_card_item from "./Checkout_card_item"
import { useSelector } from 'react-redux'
import Empty_checkout from './Empty_checkout'
function Checkout() {
    const cartData = useSelector((state) => state.cartItems);
    console.log("cart data check =", cartData);
    return (

        <div className="hk-container">
            {cartData.length?
            <div>
                    <div className="header-checkout">
                        <h2>{cartData.length} items in your basket</h2>
                        <NavLink to="/shop" className="keep-shopping">
                            Keep Shopping
                    </NavLink>
                    </div>
                    <div className="row">
                        <div className="col s8">
                            {
                                cartData.map((data) => {
                                    return (
                                        // <h1>{data.cardData.title}</h1>
                                        <Checkout_card_item
                                            producttitle={data.cardData.title}
                                            productprice={data.cardData.price}
                                            productimg={data.cardData.img_url}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className="col s4">
                            <Checkout_card />
                        </div>
                    </div>
                </div>:<Empty_checkout />}
        </div>
    );
}

export default Checkout;
