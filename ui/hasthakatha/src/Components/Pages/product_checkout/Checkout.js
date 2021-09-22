import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./checkout.scss";
import Checkout_card from "./Checkout_card"
import Checkout_card_item from "./Checkout_card_item"
import { useSelector,useDispatch} from 'react-redux'
import Empty_checkout from './Empty_checkout'
import Axios from 'axios';
import Loader from '../../Shared/loader/Loader';
import {cartItems}  from '../../../Redux/actions/index';


function Checkout() {
    // const cartData = useSelector((state) => state.cartItems);
    // console.log("cart data check =", cartData);
    const [data,setData]=useState({
        discount:"0",
        tax:"0",
        totalAmount:"0"
    })
    const [cartData,setCartData]=useState([]);
    const[Loading,setLoading]=useState(false);
    const dispatch=useDispatch();
    const userId=localStorage.getItem('userId');

    const numberOfItems = useSelector((state) => state.cartItems.numberOfItems);
    const getCart=(userId)=>{
        setLoading(true);
        Axios.get('/rest/add_to_cart/'+userId).then(res=>{
            setCartData(res.data.output);
        })
        Axios.get("/rest/add_to_cart_price_calculate/"+userId).then((res) => {
            // console.log(res.data);
            const result = res.data;
            setData(result);
            setLoading(false);
        })
        Axios.get('/rest/add_to_cart/number_of_items/' + userId).then(res => {
            const numberOfItems = res.data.number_of_items;
            dispatch(cartItems(numberOfItems))
        })
    }
    useEffect(()=>{
        getCart(userId)
    },[]);
    const handleSubmit=()=>{
        const data=[]
        Axios.post('/rest/creating_order',{
            amount: data.totalAmount,
            data: cartData,
            uid: userId
        }).then(res=>{
            console.log(res);
        })
    }
    return (
        <div className="hk-container">
            { Loading ? <div className="loader checkout"><Loader /></div> :
            numberOfItems?
            <div>
                    <div className="header-checkout">
                        <h2>{numberOfItems} items in your basket</h2>
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
                                            getCart={getCart}
                                            imgdata={data.image_data}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className="col s4">
                            <Checkout_card data={data} handleSubmit={handleSubmit}/>
                        </div>
                    </div>
                </div>:<Empty_checkout />}
        </div>
    );
}

export default Checkout;
