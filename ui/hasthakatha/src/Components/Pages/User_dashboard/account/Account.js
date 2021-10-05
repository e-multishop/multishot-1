import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Header from '../../../Header/Header';
import Footer from '../../../Footer/Footer';
import OrderList from '../order/OrderList';

function Account() {
    // const cartData = useSelector((state) => state.cartItems);
    // console.log("cart data check =", cartData);
    return (
        <>
        <Header/>
        <div className="hk-container">
            <div>
                    <div className="row">
                        <div className="col s3">
                            <Sidebar/>
                        </div>
                        <div className="col s9">
                        <OrderList/>
                        <OrderList/>
                        <OrderList/>
                        <OrderList/>
                        </div>
                    </div>
                </div>
        </div>
        <Footer/>
        </>
    );
}

export default Account;
