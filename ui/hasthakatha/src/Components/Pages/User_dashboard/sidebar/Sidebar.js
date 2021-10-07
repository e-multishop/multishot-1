import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import './sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faUser } from '@fortawesome/free-solid-svg-icons'

function Sidebar() {
    return (
        <>
            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">
                                <FontAwesomeIcon icon={faUserCircle} size='2x' className="icon" />  Shiv Prasad
                            </span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content order">
                            <span class="card-title">
                                <NavLink to="/order"><FontAwesomeIcon icon={faUser} size='1x' className="icon" /> MY ORDERS</NavLink>
                            </span>
                        </div>
                        <div class="card-content profile">
                            <span class="card-title">
                                <FontAwesomeIcon icon={faUser} size='1x' className="icon" /> ACCOUNT SETTINGS
                            </span>
                            <div className="profile-content">
                                <p>Profile Information</p>
                                <NavLink to="/addresslist"><p>Manage Addresess</p></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
