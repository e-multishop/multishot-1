import React from 'react'
import './order.scss';
import demoimg from '../../../../Images/megha.jpg'
function OrderList() {
    return (
        <>
            <div className="orderlist-flex">
                <div className="order-image">
                    <img src={demoimg} />
                </div>
                <div className="order-content">
                    <p className="title">black dress </p>
                    <p>Primary color : white</p>
                </div>
                <div className="item-price text-center">
                    <p>₹ 500</p>
                </div>
                <div className="order-delivery">
                    <p className="title">Delivry by 3 Oct 2021</p>
                    <p>Your order has been placed</p>
                </div>
            </div>
        </>
    )
}

export default OrderList;
