import React, { useState } from 'react';
import "./card.scss";
import {addToCart}  from '../../Redux/actions/index';
import {useDispatch}from 'react-redux';
const Card = (props) => {
    const dispatch=useDispatch();
    const data={ title: props.title, 
        description: props.description, 
        price: "543"
    }
    console.log(data)
    return (
        <div className="card hk-card">
            {
                props.banner ?
                    <div className="card-image">
                        <img src={props.images} />
                    </div> : ''
            }
            <div className="card-content">
                {
                    props.title ?
                        <h2>{props.title}</h2> : ''
                }
                {
                    props.description ?
                        <h6>{props.description}</h6> : ''

                }
                {
                    props.action ?
                        <div className="hk-addcard" onClick={() => {dispatch(addToCart(data))}}>
                            <a>ADD TO CART</a>
                        </div> : ''
                }
                {
                    props.footer ? props.footer : ''
                }
            </div>
        </div>
    );
}

export default Card;