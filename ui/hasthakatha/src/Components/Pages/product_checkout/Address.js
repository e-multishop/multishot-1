import React, { useEffect, useState } from 'react'
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Add_address from '../User_dashboard/address/Add_address'

function Address() {
    const [addressList, setAddressList] = useState([]);
    const getData = () => {
        axios.get('/rest/address_list/' + localStorage.getItem('userId')).then(res => {
            setAddressList(res.data.result);
            // setLoading(false);
        });
    }
    useEffect(() => {
        getData();
    }, []);
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
  
    return (
        <div >
            {
                addressList.map((a, i) => {
                    return (
                        <div className="checkout-address-list" key={i}>
                            <div className="address-bar">
                                <p className="name">{a.name}</p>
                                <p className="address">{a.address}</p>
                                <p className="phone-number">Phone number- {a.phone}</p>
                                <button className="waves-effect waves-light btn btn-color">Delivery Here</button>
                            </div>
                        </div>

                    )
                })
            }
            <div className="add-address-checkout" onClick={onOpenModal}>
                <FontAwesomeIcon icon={faPlus} size='large' className="icon"/>   ADD A NEW ADDRESS
            </div>
            <Modal open={open} onClose={onCloseModal} center>
                <Add_address checkout_address={'yes'}/>
            </Modal>
        </div>
    )
}

export default Address;
