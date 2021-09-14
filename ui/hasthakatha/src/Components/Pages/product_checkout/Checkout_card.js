import React,{useEffect,useState} from 'react'
import "./checkout.scss"
import Axios from 'axios';

function Checkout_card() {
    const [data,setData]=useState({
        discount:"0",
        tax:"0",
        totalAmount:"0"
    })
    useEffect(() => {
        Axios.get("/rest/add_to_cart_price_calculate").then((res) => {
          // console.log(res.data);
          const result = res.data;
          setData(result);
        })
    },[]);
    return (
        <>

            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">PRICE DETAILS</span>
                            <div className="hk-card-action card-price-section">
                                <p>Price</p>
                                <p>₹{data.totalAmount}</p>
                            </div>
                            <div className="hk-card-action card-price-section">
                                <p>Tax</p>
                                <p>₹{data.tax}</p>
                            </div>
                            <div className="hk-card-action card-price-section">
                                <p>Discount</p>
                                <p>-₹{data.discount}</p>
                            </div>
                            <div className="hk-card-action card-price-section">
                                <p>Delivary Charges</p>
                                <p className="green-text">FREE</p>
                            </div>
                            <div className="hk-card-action card-price-section card-total-amount">
                                <p>Total Amount</p>
                                <p>₹{data.totalAmount}</p>
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
