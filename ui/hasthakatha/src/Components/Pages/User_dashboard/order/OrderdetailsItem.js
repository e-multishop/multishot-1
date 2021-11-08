import React, { useEffect, useState } from "react";
import ReviewBox from "../review/ReviewBox";
import Review from "../review/Review";
import axios from "axios";
import Util from "../../../Common/Util";

const OrderDetailsItem = (props) => {

    const [showReview, setShowReview] = useState(false);
    const [hasReviewAlready, setHasReviewAlready] = useState(false);
    const [imageData, setImageData] = useState('');
    const showReviewInput = () => {
        setShowReview(!showReview);
    }
    useEffect(() => {
        if (props.review && props.review.rating) {
            setHasReviewAlready(true);
        } else {
            setHasReviewAlready(false);
        }
    }, [props.review]);

    useEffect(() => {
        axios.get('/rest/productdetails/images/main/'+props.pid)
        .then(res => {
            if (res.data.result && res.data.result.length > 0) {
                const imageData = res.data.result[0].image_data;
                setImageData(imageData);
            }
        })
        .catch(e => {
            // do nothing
        });
    }, [props.pid]);

    const showReviewSection = () => {
        if (hasReviewAlready) {
            return (
                <div>
                    <h6>Your review:</h6>
                    <div>
                        <Review rating={props.review.rating} readonly={true} />
                        <blockquote>{props.review.description}</blockquote>
                    </div>
                </div>
            )
        } else {
            return showReviewSubsection();
        }
    }
    const showReviewSubsection = () => {
        if (showReview) {
            return (<ReviewBox order_id={props.order_id} review={props.review} pid={props.pid} setShowReview={setShowReview}/>)
        } else {
            return (<button className="waves-effect waves-light btn btn-color hs-ml-16" onClick={showReviewInput}>Add a review</button>)
        }
    }
    return (
    <div className="product-details">
        {/* <h2>Delivered 06-May-2021</h2> */}
        <div className="order-flex">
            <div className="order-image">
                {
                    imageData ? <img src={imageData} alt="Image data" /> : ''
                }
            </div>
            <div className="order-content">
                <span></span>
                <p className="title">{props.title} </p>
                <p>{props.color === -1 ? '' : 'Primary color : ' + props.color}</p>
                {/* <button className="waves-effect waves-light btn btn-color" >
                    <FontAwesomeIcon icon={faRetweet} size='1x' className="repeat-icon" />
                    Buy it again</button> */}
                {
                    showReviewSection()
                }

            </div>
            <div className="item-price text-center">
                <p><span>Amount:</span> ₹ {props.price}</p>
                <p><span>Quantity:</span> {props.quantity}</p>
                <br/>
                <p className="item-details">
                    {
                        props.color === -1 ? '' : props.color
                    }
                    {
                        'Size: ' + Util.getSize(props.size)
                    }
                </p>
            </div>
        </div>
    </div>
    )
}

export default OrderDetailsItem;