import React from 'react';
import './ProductReview.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {faStar} from '@fortawesome/free-solid-svg-icons';

const ProductReview =(props)=>{
    const showDate = (date) => {
        return new Date(parseInt(date)).toLocaleString();
    }
    return(
        <div className="hk-product-review">
            <div className="review-header">
                    <div className="custmer-image">
                        {props.CustmerImg?<img src={props.CustmerImg} alt=""/>:
                        <FontAwesomeIcon icon={faUserCircle} size='3x' className="user-icon"/>}
                    </div>
                    <div className="custmer-name">
                        <a href="#">{props.CustmerName ? props.CustmerName : 'User'}</a>
                    </div>
                    <div className="review-date">
                        {showDate(props.ReviewDate)}
                    </div>
            </div>
            
            <div className="review-body">
                <div className="review-ratting">
                    <FontAwesomeIcon icon={faStar}/>
                    {props.Rating>1?<FontAwesomeIcon icon={faStar}/>:''}
                    {props.Rating>2?<FontAwesomeIcon icon={faStar}/>:''}
                    {props.Rating>3?<FontAwesomeIcon icon={faStar}/>:''}
                    {props.Rating>4?<FontAwesomeIcon icon={faStar}/>:''}
                </div>
                <div className="review-content">
                    <p>{props.ReviewContent}</p>
                </div>
                <div className="product-image">
                    <img src={props.ProductImg} alt=" "/>
                </div>
            </div>
           
        </div>  
    );
}

export default ProductReview;