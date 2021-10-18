import React, { useEffect, useState } from 'react'
import './address.scss';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

function Address_list() {
    const [addressList, setAddressList] = useState([]);
    useEffect(() => {
        axios.get('/rest/address_list/'+localStorage.getItem('userId')).then(res => {
            setAddressList(res.data.result);
        });
    }, [])
    return (
        <div>
            <h2 className="address-list-page-title">Manage Address</h2>
            <NavLink to="/account/addaddress">
                <div className="add-new-address-title">
                <FontAwesomeIcon icon={faPlus} size='large' className="icon"/>   ADD A NEW ADDRESS
                </div>
            </NavLink>
            {
                addressList.map((a,i)=> {
                    return (
                        <div className="address-list" key={i}>
                            <div className="address-bar">
                                <p className="name">{a.name}</p>
                                <p className="address">{a.address}</p>
                                <p className="phone-number">Phone number- {a.phone}</p>
                            </div>
                            <div className="edit-delete-icon">
                                    <p>Edit</p>
                                    <p>Delete</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Address_list;
