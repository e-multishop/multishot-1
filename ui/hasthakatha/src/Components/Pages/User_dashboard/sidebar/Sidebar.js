import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import './sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faUser ,faBox} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

function Sidebar() {

    return (
        <>
            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">
                                <FontAwesomeIcon icon={faUserCircle} size='2x' className="icon" />  {localStorage.getItem('userName')?localStorage.getItem('userName'):localStorage.getItem('userEmail')}
                            </span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content order">
                            <span class="card-title">
                                <NavLink to="/account/order"><FontAwesomeIcon icon={faBox} size='1x' className="icon" /><span className="icon-title">MY ORDERS</span></NavLink>
                            </span>
                        </div>
                        <div class="card-content profile">
                            <span class="card-title">
                                <FontAwesomeIcon icon={faUser} size='1x' className="icon" /> <span className="icon-title">ACCOUNT SETTINGS</span>
                            </span>
                            <div className="profile-content">
                                <NavLink to="/account/userprofile"><p  className="icon-title">Profile Information</p></NavLink>
                                <NavLink to="/account/addresslist"><p  className="icon-title">Manage Addresess</p></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
