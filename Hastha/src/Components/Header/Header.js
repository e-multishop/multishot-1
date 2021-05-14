import React from 'react';
import  "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';

const Header =()=>{
    return(
        <div className="row hk-header">
            <div className="col s12">
                <nav className="hk-header">
                    <div className="nav-wrapper  ">
                        <a href="#" className="brand-logo left">Logo</a>
                        <ul id="nav-mobile " className="hide-on-med-and-down right hk-main-menu">

                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About us</NavLink></li>
                            <li><NavLink to="/shop">Shop</NavLink></li>
                            <li><NavLink to="/contact">Contact us</NavLink></li>
                            <li><FontAwesomeIcon icon={faUser} size="large"/></li>

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