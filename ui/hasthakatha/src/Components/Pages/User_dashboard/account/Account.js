import React from 'react'
import './account.scss'
import Sidebar from '../sidebar/Sidebar'
import Header from '../../../Header/Header';
import Footer from '../../../Footer/Footer';
import Address_list from '../address/Address_list'
import { NavLink } from 'react-router-dom';
import UserProfile from '../profile/UserProfile';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Add_address from '../address/Add_address';
import Order from '../order/Order';

function Account() {
    // const cartData = useSelector((state) => state.cartItems);
    // console.log("cart data check =", cartData);
    return (
        <>
            <Header />
            <div className="hk-container">
                <div>
                    <div className="row">
                        <div className="col s3 ">
                            <div className="sidebar-main">
                                <Sidebar />
                            </div>
                        </div>
                        <div className="col s9">
                            <HashRouter>
                                <Switch>
                                    <Route exact path="/account/addresslist" component={Address_list}/>
                                    <Route exact path="/account/addaddress" component={Add_address} />
                                    <Route exact path="/account/order" component={Order} />
                                    <Route component={UserProfile} />
                                </Switch>
                            </HashRouter>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Account;
