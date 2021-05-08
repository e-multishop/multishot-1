import React from 'react';
import  "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser } from '@fortawesome/free-solid-svg-icons'

const Header =()=>{
    return(
        <div className="row">
            <div className="col s12">
                <nav className="hk-header">
                    <div className="nav-wrapper  ">
                        <a href="#" className="brand-logo left">Logo</a>
                        <ul id="nav-mobile " className="hide-on-med-and-down right hk-main-menu">

                            <li><a href="sass.html">Home</a></li>
                            <li><a href="badges.html">About us</a></li>
                            <li><a href="collapsible.html">Shop</a></li>
                            <li><a href="collapsible.html">Contact us</a></li>
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