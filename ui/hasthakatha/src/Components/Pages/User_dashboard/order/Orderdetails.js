import React, { useEffect, useState } from 'react'
import Header from '../../../Header/Header';
import Footer from '../../../Footer/Footer';
import axios from 'axios';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import demoimg from '../../../../Images/megha.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
function Orderdetails(props) {
    const { order_id } = useParams();
    const [orderDetails, setOrderDtails] = useState({});
    const [showReview, setShowReview] = useState(false);
    const [review, setReview] = useState('');
    const [reviewExists, setReviewExists] = useState();
    const [rating, setRating] = useState(0);
    useEffect(() => {
        const uid = localStorage.getItem('userId');
        axios.get('/rest/order_details/' + uid + '/' + order_id).then(res => {
            setOrderDtails(res.data.result[0]);
        });
    }, [])
    const showOrderStatus = (status) => {
        switch (status) {
            case 1:
                return (<span className="hk-order-status active">IN PROGRESS</span>);
            case 2:
                return (<span className="hk-order-status success">SUCCESS</span>);
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
    const addReview = () => {
        axios.post('/rest/reviews', {
            userid: localStorage.getItem('userId'),
            pid: orderDetails.pid,
            rating: rating,
            description: review
        }).then(res => {
            toast.success('Review added successfully')
        });
    }
    const setReviewRating = (rating) => {
        setRating(rating);
    }
    const showReviewBox = () => {
        return (
            <div>
                <div className="hs-product-rating hs-mt-16">
                    <span class="material-icons hs-action-icon" onClick={() => setReviewRating(1)}>{rating > 0 ? 'star' : 'star_outline'}</span>
                    <span class="material-icons hs-action-icon" onClick={() => setReviewRating(2)}>{rating > 1 ? 'star' : 'star_outline'}</span>
                    <span class="material-icons hs-action-icon" onClick={() => setReviewRating(3)}>{rating > 2 ? 'star' : 'star_outline'}</span>
                    <span class="material-icons hs-action-icon" onClick={() => setReviewRating(4)}>{rating > 3 ? 'star' : 'star_outline'}</span>
                    <span class="material-icons hs-action-icon" onClick={() => setReviewRating(5)}>{rating > 4 ? 'star' : 'star_outline'}</span>
                </div>
                <textarea className="materialize-textarea" placeholder="Write your review" onChange={updateReview} value={review}></textarea>
                <div className="hs-action-wrapper">
                    <button className="waves-effect waves-light btn btn-default" onClick={cancelReview}>Cancel</button>
                    <button className="waves-effect waves-light btn btn-color hs-ml-16" onClick={addReview}>Add</button>
                </div>
            </div>
        )
    }
    const getAmount = (data) => {
        if (data === undefined || data === null) {
            return '0.00';
        }
        return data;
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
                </div>
                <div className="product-details">
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
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Orderdetails;
