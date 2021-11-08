import React, { useEffect, useState } from 'react'
import './order.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCheck ,faDolly,faTruck} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
function OrderList(props) {
    const [orderImage, setOrderImage] = useState('');
    const [orderPID, setOrderPID] = useState('');
    const [summary, setSummary] = useState('');
    useEffect(() =>{
        if (!summary) {
            const convertedSummary = atob(props.product_summary);
            const convertedSummaryJSON = JSON.parse(convertedSummary);
            setSummary(convertedSummaryJSON);
            if (!orderPID) {
                if (convertedSummaryJSON && convertedSummaryJSON.length > 0) {
                    const pid = convertedSummaryJSON[0].pid;
                    if (pid) {
                        axios.get('/rest/productdetails/images/main/'+pid).then(res => {
                            if (res.data.result && res.data.result.length > 0) {
                                setOrderImage(res.data.result[0].image_data);
                            }
                        });
                    }
                }
            }
        }
    },[props.product_summary]);
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
                        <p className="title order-color"><FontAwesomeIcon icon={faDolly} size="1x" />  Ordered</p>
                        <p className="info">Your order has been placed.</p>
                    </div>)
                case 2:
                    let deliveryDate = item.delivery_date;
                    if (deliveryDate) {
                        deliveryDate = parseInt(deliveryDate);
                        deliveryDate = (new Date(deliveryDate)).toLocaleDateString();
                    }
                    return (<div className="hs-order-status">
                        <p className="title delivery-color"><FontAwesomeIcon icon={faTruck} size="1x" />  Delivery</p>
                        <p className="info">Delivery on {deliveryDate}</p>
                    </div>)
                case 3:
                    return (<div className="hs-order-status">
                        <p className="title delivered-color"> <FontAwesomeIcon icon={faCheck} size="1x" color="green"/>  Delivered</p>
                        <p className="info">Delivered on {item.delivered_date}</p>
                    </div>)
                default: 
                    return (<></>)
            }
        }
    }
    const showProductSummary = (lsummary) => {
        if (summary) {
            return (
                summary.map(s => {
                    return <p className="procuct-title"><FontAwesomeIcon icon={faCircle} className="procuct-title-icon" />  {s.title}</p>;
                })
            )
        } else {
            return (
                <p> <FontAwesomeIcon icon={faCircle} className="procuct-title-icon" color="red"/> No product summary</p>
            )
        }
    };
    return (
        <>
           <div className="orderlist-flex">
                <div className="order-image">
                    {orderImage ? <img src={orderImage} /> : ''}
                </div>
                <div className="order-content">
                    {/* <span>{props.order_id}</span> */}
                    <p className="title"> {showProductSummary(props.product_summary)} </p>
                    {/* <p className="color">Primary color : white</p> */}
                    <p className="order-on">Ordered On: {showCreatedDate(props.created_date)}</p>
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
