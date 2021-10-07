import React from 'react'
import './address.scss';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function Address_list() {
    return (
        <div>
            <h2 className="address-list-page-title">Manage Address</h2>
            <NavLink to="/addaddress">
                <div className="add-new-address-title">
                <FontAwesomeIcon icon={faPlus} size='large' className="icon"/>   ADD A NEW ADDRESS
                </div>
            </NavLink>
            <div className="address-list">
                <div className="address-bar">
                    <p className="name">Shiv Prasad</p>
                    <p className="address">47, Mo- jagdish patti post- kachahari, Jaunpur, Uttar Pradesh - 222002</p>
                    <p className="phone-number">Phone number- 8545824846</p>
                </div>
                <div className="edit-delete-icon">
                        <p>Edit</p>
                        <p>Delete</p>
                </div>
            </div>
            <div className="address-list">
                <div className="address-bar">
                    <p className="name">Shiv Prasad</p>
                    <p className="address">47, Mo- jagdish patti post- kachahari, Jaunpur, Uttar Pradesh - 222002</p>
                    <p className="phone-number">Phone number- 8545824846</p>
                </div>
                <div className="edit-delete-icon">
                        <p>Edit</p>
                        <p>Delete</p>
                </div>
            </div>
        </div>
    )
}

export default Address_list;
