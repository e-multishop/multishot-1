import React from 'react'
import { NavLink } from 'react-router-dom'
import "./checkout.scss";
import Checkout_card from "./Checkout_card"
import Checkout_card_item from "./Checkout_card_item"
import {useSelector} from 'react-redux'

function Checkout() {
    const cartData=useSelector((state)=>state.cartItems);
    console.log("cart data check =",cartData);
    return (
        <div className="hk-container">
            <div className="header-checkout">
                    <h2>{cartData.length} items in your basket</h2>
                    <NavLink to="/shop" className="keep-shopping">
                    Keep Shopping
                    </NavLink>
            </div>
            <div className="row">
                <div className="col s8">
                    {
                        cartData.map((data)=>{
                            return(
                                <Checkout_card_item producttitle={data.title} productprice={data.price}/>
                            )
                        })
                    }
                </div>
                <div className="col s4">
                    <Checkout_card/>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
