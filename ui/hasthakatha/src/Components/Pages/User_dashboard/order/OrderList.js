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
    const showCreatedDate = (datetime) => {
        const actualDateTime = parseInt(datetime);
        try { 
            return (new Date(actualDateTime)).toLocaleDateString();
        } catch(e) { 
            return datetime;
        }
    };
    const showOrderStatus = (deliveryStatus) => {
        if (deliveryStatus !== undefined) {
            switch (deliveryStatus) {
                case 1:
                    return (<div className="hs-order-status">
                        <p className="title">Ordered</p>
                        <p className="info">Your order has been placed.</p>
                    </div>)
                case 2:
                    return (<div className="hs-order-status">
                    <p className="title">Delivery</p>
                    <p className="info">Delivered on ...</p>
                </div>)
                default: 
                    return (<></>)
            }
        }
    }
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
                    <p>Created On: {showCreatedDate(props.created_date)}</p>
                </div>
                <div className="item-price text-center">
                    <p>{props.total_amount ? '₹' + props.total_amount : 'Error'}</p>
                </div>
                <div className="order-delivery">
                    { showOrderStatus(props.delivery_status) }
                </div>
            </div>
        </>
    )
}

export default OrderList;
