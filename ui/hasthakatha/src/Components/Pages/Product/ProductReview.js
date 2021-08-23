import React from 'react';
import './ProductReview.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {faStar} from '@fortawesome/free-solid-svg-icons';

const ProductReview =(props)=>{
    return(
        <div className="hk-product-review">
            <div className="review-header">
                    <div className="custmer-image">
                        <img src={props.CustmerImg} alt=""/>
                    </div>
                    <div className="custmer-name">
                        <a href="#">{props.CustmerName}</a>
                    </div>
                    <div className="review-date">
                        {props.ReviewDate}
                    </div>
            </div>
            
            <div className="review-body">
                <div className="review-ratting">
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                </div>
                <div className="review-content">
                    <p>{props.ReviewContent}</p>
                </div>
                <div className="product-image">
                    <img src={props.ProductImg} alt=" "/>
                </div>
            </div>
            <div className="review-footer">
                <p>Purchased item:</p>
                <a href="#" className="purchase-item"> 
                                <div className="purchase-img">
                                    <img src={props.PurchaseImg} alt=""/>
                                </div>
                                <div className="purchase-name">
                                {props.PurchaseName}
                                </div>
                </a>
                <a href="#" ><p className="helpfull"><FontAwesomeIcon icon={faThumbsUp}/> Helpfull ?</p></a>
            </div>
        </div>  
    );
}

export default ProductReview;