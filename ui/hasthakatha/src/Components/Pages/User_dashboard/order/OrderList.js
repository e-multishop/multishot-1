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
            const date = new Date(actualDateTime);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        } catch(e) { 
            return datetime;
        }
    };
    const showOrderStatus = (deliveryStatus, item) => {
        if (deliveryStatus !== undefined) {
            switch (deliveryStatus) {
                case 1:
                    return (<div className="hs-order-status">
                        <p className="title">Ordered</p>
                        <p className="info">Your order has been placed.</p>
                    </div>)
                case 2:
                    let deliveryDate = item.delivery_date;
                    if (deliveryDate) {
                        deliveryDate = parseInt(deliveryDate);
                        deliveryDate = (new Date(deliveryDate)).toLocaleDateString();
                    }
                    return (<div className="hs-order-status">
                        <p className="title">Delivery</p>
                        <p className="info">Delivery on {deliveryDate}</p>
                    </div>)
                case 3:
                    return (<div className="hs-order-status">
                        <p className="title">Delivered</p>
                        <p className="info">Delivered on {item.delivered_date}</p>
                    </div>)
                default: 
                    return (<></>)
            }
        }
    }
    const showProductSummary = (summary) => {
        if (summary) {
            const convertedSummary = atob(summary);
            const convertedSummaryJSON = JSON.parse(convertedSummary);
            
            return (
                convertedSummaryJSON.map(s => {
                    return <p>{s.title}</p>;
                })
            )
        } else {
            return (
                <p>No product summary</p>
            )
        }
    };
    return (
        <>
           <div className="orderlist-flex">
                <div className="order-image">
                    <img src={demoimg} />
                </div>
                <div className="order-content">
                    <span>{props.order_id}</span>
                    <p className="title">{showProductSummary(props.product_summary)} </p>
                    <p>Primary color : white</p>
                    <p>Ordered On: {showCreatedDate(props.created_date)}</p>
                </div>
                <div className="item-price text-center">
                    <p>{props.total_amount ? '₹' + props.total_amount : 'Error'}</p>
                </div>
                <div className="order-delivery">
                    { showOrderStatus(props.delivery_status, props) }
                </div>
            </div>
        </>
    )
}

export default OrderList;
