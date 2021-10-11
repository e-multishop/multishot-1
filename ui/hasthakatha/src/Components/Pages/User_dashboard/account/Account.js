import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Header from '../../../Header/Header';
import Footer from '../../../Footer/Footer';
import Address_list from '../address/Address_list'
import { NavLink } from 'react-router-dom';
import UserProfile from '../profile/UserProfile';

function Account() {
    // const cartData = useSelector((state) => state.cartItems);
    // console.log("cart data check =", cartData);
    return (
        <>
            <Header />
            <div className="hk-container">
                <div>
                    <div className="row">
                        <div className="col s3">
                            <Sidebar />
                        </div>
                        <div className="col s9">
                            <UserProfile/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Account;
