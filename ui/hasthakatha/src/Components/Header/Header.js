import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import logo from '../../Images/logopng.png';
import "./Header.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import search from './Search';
import Modal from '../Pages/login/Modal'
import LoginDropdown from '../Pages/login/LoginDropdown'
import { ToastContainer, toast } from 'react-toastify';
import {useSelector} from 'react-redux'

const Header = (props) => {
    const [LoggedIn, setLoggedIn] = useState(false)
    const token = localStorage.getItem('token');
    const [Email, setEmail] = useState();
    const cartData=useSelector((state)=>state.cartItems);
    // localStorage.clear();
    useEffect(() => {
        if (token != null) {
            setLoggedIn(true)
            // setEmail(email)
        }
    }, []);

    const HandleChange = function () {
        if (LoggedIn === false) {
            function destroydata() {
                ReactDOM.unmountComponentAtNode(
                    document.getElementById("modal")
                );
            }
            ReactDOM.render(<Modal destroydata={destroydata} setLoggedIn={setLoggedIn} setEmail={setEmail} />, document.getElementById("modal"),);
        }
    }

    return (
        <div className="row no-margin navbar-fixed">
            <div className="col s12 no-padding ">
                <nav className="hk-header">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo ">
                            <img src={logo} alt="logo" className="hk-logo left" />
                            <span className="hk-logoname">HasthaKatha</span>
                        </a>
                        <ul id="nav-mobile " className="hide-on-med-and-down right hk-main-menu">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About us</NavLink></li>
                            <li><NavLink to="/shop">Shop</NavLink></li>
                            <li><NavLink to="/contact">Contact us</NavLink></li>
                            {/* <li><NavLink to="/admin">Admin</NavLink></li> */}
                            {/* <li><LoginDropdown/></li> */}
                            <li onClick={search}><FontAwesomeIcon icon={faSearch} size="large" className="icon slide-out" /></li>
                            {<li>

                                {LoggedIn ? <LoginDropdown setLoggedIn={setLoggedIn} email={Email} /> : <button onClick={HandleChange}><FontAwesomeIcon icon={faUser} size='large' className="icon " />
                                </button>}

                            </li>}
                            <li>
                                <NavLink to="/viewcart"><div className="cart"><FontAwesomeIcon icon={faShoppingCart} size="large" className="icon " /><span class="badge cart-badge">{cartData.length}</span></div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <ToastContainer
                hideProgressBar={true}
            />
        </div>

    );
}

export default Header;