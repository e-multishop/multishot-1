import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./checkout.scss";
import Checkout_card from "./Checkout_card"
import Checkout_card_item from "./Checkout_card_item"
import { useSelector } from 'react-redux'
import Empty_checkout from './Empty_checkout'
import Axios from 'axios';

function Checkout() {
    // const cartData = useSelector((state) => state.cartItems);
    // console.log("cart data check =", cartData);
    const [cartData,setCartData]=useState([]);
    useEffect(()=>{
        const userId=localStorage.getItem('userId')
        Axios.get('/rest/add_to_cart/'+userId).then(res=>{
            // debugger;
            setCartData(res.data.output);
        })
    },[]);
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
                                            producttitle={data.title}
                                            productprice={data.price}
                                            productimg={data.img_url}
                                            id={data.id}
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
