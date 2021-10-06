import React, { useEffect, useState } from 'react'
import Header from '../../../Header/Header';
import Footer from '../../../Footer/Footer';
import axios from 'axios';
import { useParams } from 'react-router';

function Orderdetails(props) {
    const {order_id} = useParams();
    const [orderDetails, setOrderDtails] = useState({});
    useEffect(() => {
        const uid = localStorage.getItem('userId');
        axios.get('/rest/order_details/'+uid+'/'+order_id).then(res => {
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
                            <p>₹0.00</p>
                        </div>
                        <div>
                            <p>Shipping:</p>
                            <p>₹0.00</p>
                        </div>
                        <div>
                            <p>Total:</p>
                            <p>₹0.00</p>
                        </div>
                        <div >
                            <p className="grand-total">Grand Total:</p>
                            <p className="grand-total">₹0.00</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Orderdetails;
