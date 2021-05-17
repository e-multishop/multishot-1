import React from 'react';
import logo from '../../Images/logo.png';
import  "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
const Header =()=>{
    return(
        <div className="row">
            <div className="col s12 no-padding">
                <nav className="hk-header">
                    <div className="nav-wrapper  ">
                        <a href="/" className="brand-logo left ">
                            <img src={logo} alt="logo" className="hk-logo"/>
                        </a>
                        <ul id="nav-mobile " className="hide-on-med-and-down right hk-main-menu">

                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About us</NavLink></li>
                            <li><NavLink to="/shop">Shop</NavLink></li>
                            <li><NavLink to="/contact">Contact us</NavLink></li>
                            <li><FontAwesomeIcon icon={faUser} size="large" className="user-icon"/></li>

                        </ul>
                        
                        <div className="right">
                            
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Header;