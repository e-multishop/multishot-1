import React from 'react';
import ReactDOM from 'react-dom'
import logo from '../../Images/logopng.png';
import "./Header.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import search from './Search';
import Modal from '../Pages/login/Modal'
const Header = () => {
    const search = () => {
        ReactDOM.render(<Search />, document.getElementById("search"),);
    }
    // useEffect(() => {
    //     const modal1 = document.getElementById("login");
    //     var elems = modal1.querySelectorAll('.modal');
    //     const options = {};
    //     var instances = M.Modal.init(elems, options);
    // });
    function HandleChange(){
        function destroydata(){
            ReactDOM.unmountComponentAtNode(
                 document.getElementById("modal")
            );
        }
        ReactDOM.render(<Modal destroydata={destroydata}/>, document.getElementById("modal"),);
        
    }

    return (
        <div className="row no-margin">
            <div className="col s12 no-padding">
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
                            <li><NavLink to="/admin">Admin</NavLink></li>
                            <li onClick={search}><FontAwesomeIcon icon={faSearch} size="large" className="icon slide-out" /></li>
                            <li><button onClick={HandleChange}><FontAwesomeIcon icon={faUser} size="large" className="icon "/></button></li>
                            <li><NavLink to="/"><FontAwesomeIcon icon={faShoppingCart} size="large" className="icon " /></NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>

    );
}

export default Header;