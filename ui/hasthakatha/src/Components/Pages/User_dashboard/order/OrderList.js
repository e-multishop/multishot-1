import React, { useEffect, useState } from 'react'
import './order.scss';
import demoimg from '../../../../Images/megha.jpg'
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
function OrderList(props) {
    const showDate = (datetime) => {
        // return (new Date(datetime)).toLocaleDateString();
        return datetime;
    };
    return (
        <>
           <div className="orderlist-flex">
                <div className="order-image">
                    <img src={demoimg} />
                </div>
                <div className="order-content">
                    <span>{props.order_id}</span>
                    <p className="title">black dress </p>
                    <p>Primary color : white</p>
                </div>
                <div className="item-price text-center">
                    <p>₹ 500</p>
                </div>
                <div className="order-delivery">
                    <p className="title">Delivry by {showDate(props.created_date)}</p>
                    <p>Your order has been placed</p>
                    <p>Rate & Reviews Product</p>
                </div>
            </div>
        </>
    )
}

export default OrderList;
