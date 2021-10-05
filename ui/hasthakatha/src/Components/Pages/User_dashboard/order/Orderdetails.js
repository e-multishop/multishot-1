import React from 'react'
import Header from '../../../Header/Header';
import Footer from '../../../Footer/Footer';

function Orderdetails() {
    return (
        <>
            <Header />
            <div className="order-details-container">
                <h2 className="order-details-title">Order Details</h2>
                <p>Ordered on 20 September 2021 | Order# 408-6292390-5814735</p>
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
                        <p className="details-section-heading">Order Summary</p>
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
