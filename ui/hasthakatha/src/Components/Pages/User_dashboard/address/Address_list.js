import React from 'react'
import './address.scss';
import { NavLink } from 'react-router-dom'
function Address_list() {
    return (
        <div>
            <h2 className="address-list-page-title">Manage Address</h2>
            <NavLink to="/addaddress">
                <div className="add-new-address-title">
                    ADD A NEW ADDRESS
                </div>
            </NavLink>
        </div>
    )
}

export default Address_list;
