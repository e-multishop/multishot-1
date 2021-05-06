import React from 'react';
import "./Header.css";


const Header =()=>{
    return(
    <>
        <div className="has-header">
            <div className="has-logo">
                <img src="assets/logo.png" alt="Logo"/>
            </div>
            <div className="has-menu">
                <ul>
                    <li><a>Home</a></li>
                    <li><a>About us</a></li>
                    <li><a>Shop</a></li>
                    <li><a>Contact us</a></li>
                </ul>
            </div>
            <div className="">
                    <div className="">

                    </div>
                    <div className="">

                    </div>
            </div>
        </div>
    </>
    );
}

export default Header;