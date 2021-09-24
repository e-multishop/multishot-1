import React, { useEffect } from 'react'
import "./login.scss";
import icon from "../../../Images/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCheck,faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {cartItems} from '../../../Redux/actions/index';
function LoginDropdown(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        const dropdown1 = document.getElementById("dropdown-share");
        var elems = dropdown1.querySelectorAll('.dropdown-trigger');
        const options = {};
        var instances = M.Dropdown.init(elems, options);
        console.log("check",instances);
        // instances[0].open()
    },[]);
    const HandleChange = () => {
        localStorage.clear();
        props.setLoggedIn(false);
        // clear cart
        document.location.href = '/';
         
    }
    const userEmail = localStorage.getItem('userEmail');
    return (
        <div id="dropdown-share">

            {/* <!-- Dropdown Trigger --> */}
            <a class='dropdown-trigger' href='#' data-target='dropdown1'>
                <FontAwesomeIcon icon={faUserCheck} size='large' className="icon" />
            </a>
            {/* //   <!-- Dropdown Structure --> */}
            {/* <div className="dropdown-con"> */}
                <ul id='dropdown1' className='dropdown-content logout-op'>
                    <li className="icon-block">
                        <FontAwesomeIcon icon={faUserCircle} size='4x' className="icon" />
                    </li>
                    <li><NavLink to="/account" className="email">{userEmail}</NavLink></li>
                    <li><a onClick={HandleChange}>Logout</a></li>
                </ul>
            {/* </div> */}
        </div>
    );
}

export default LoginDropdown;
