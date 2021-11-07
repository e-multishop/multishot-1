import React, { useEffect, useState } from 'react'
import Header from '../../../Header/Header';
import Footer from '../../../Footer/Footer';
import axios from 'axios';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import demoimg from '../../../../Images/megha.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import OrderDetailsItem from './OrderdetailsItem';


function Orderdetails(props) {
    const { order_id } = useParams();
    const [orderDetails, setOrderDtails] = useState([]);
    const [showReview, setShowReview] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewExists, setReviewExists] = useState();
    const [rating, setRating] = useState(0);
    const getReviews = (orderID) => {
        axios.get('/rest/reviews/order/'+orderID).then(res => {
            setReviews(res.data.result);
        });
    }
    useEffect(() => {
        const uid = localStorage.getItem('userId');
        axios.get('/rest/order_details/' + uid + '/' + order_id).then(res => {
            setOrderDtails(res.data.result);
        });
        getReviews(order_id);
    }, [])
    const showOrderStatus = (status) => {
        switch (status) {
            case 1:
                return (<span className="hk-order-status active">ORDERED</span>);
            case 2:
                return (<span className="hk-order-status success">DELIVERED</span>);
            case 0:
                return (<span className="hk-order-status error">FAILED</span>);
            default:
                return (<span>Error</span>)
        }
    }
    const showReviewInput = () => {
        setShowReview(true);
    }
    const updateReview = (e) => {
        const value = e.target.value;
        setReview(value);
    }
    const cancelReview = () => {
        setReview('');
        setShowReview(false);
    }
    const getAmount = (data) => {
        if (data === undefined || data === null) {
            return '0.00';
        }
        return data;
    }
    const getReview = (pid) => {
        if (reviews.length > 0) {
            const match = reviews.filter(r => r.pid === pid);
            return match && match.length > 0 ? match[0] : {
                created_date: '',
                description: '',
                rating: 0
            };
        }
        return {
            created_date: '',
            description: '',
            rating: 0
        };
    }
    return (
        <>
            <Header />
            <div className="order-details-container">
                <h2 className="order-details-title">Order Details</h2>
                <p>Ordered on 20 September 2021 | Order# {order_id}</p>
                <div className="details-section">
                    <div className="address-section">
                        <p className="details-section-heading">Shipping Address</p>
                        <p>SHIV PRASAD
                        UP AGRO
                        JAGDISH PATTI NEAR JAGDISHPUR RAILWAY CROSSING
                        JAUNPUR, UTTAR PRADESH 222002
                        India</p>
                    </div>
                    <div className="payment-method">
                        <p className="details-section-heading">Payment Method</p>
                        <p>Amazon payment</p>
                    </div>
                    <div className="price-section">
                        <p className="details-section-heading">Order Summary{showOrderStatus(orderDetails.t_status)}</p>
                        <div>
                            <p>Item(s) Subtotal:</p>
                            <p>₹{getAmount(orderDetails.total_amount)}</p>
                        </div>
                        <div>
                            <p>GST:</p>
                            <p>₹0.00</p>
                        </div>
                        <div>
                            <p>Shipping:</p>
                            <p>₹0.00</p>
                        </div>
                        <div>
                            <p>Total:</p>
                            <p>₹{getAmount(orderDetails.total_amount)}</p>
                        </div>
                        <div >
                            <p className="grand-total">Grand Total:</p>
                            <p className="grand-total">₹{getAmount(orderDetails.total_amount)}</p>
                        </div>
                    </div>
                    <div className="order_status">
                        
                    </div>
                </div>
                <div>
                    {
                        orderDetails.map(o => <OrderDetailsItem {...o} review={getReview(o.pid)}/>)
                    }
                </div>
                {/* <div className="product-details">
                    <h2>Delivered 06-May-2021</h2>
                    <div className="order-flex">
                        <div className="order-image">
                            <img src={demoimg} />
                        </div>
                        <div className="order-content">
                            <span></span>
                            <p className="title">{orderDetails.title} </p>
                            <p>Primary color : white</p>
                            <button className="waves-effect waves-light btn btn-color" >
                                <FontAwesomeIcon icon={faRetweet} size='1x' className="repeat-icon" />
                                Buy it again</button>
                            {
                                showReview
                                    ? showReviewBox()
                                    : <button className="waves-effect waves-light btn btn-color hs-ml-16" onClick={showReviewInput}>Add a review</button>
                            }

                        </div>
                        <div className="item-price text-center">
                            <p><span>Amount:</span> ₹ {orderDetails.amount}</p>
                            <p><span>Quantity:</span> {orderDetails.quantity}</p>
                        </div>
                    </div>
                </div> */}
            </div>
            <Footer />
        </>
    )
}

export default Orderdetails;
