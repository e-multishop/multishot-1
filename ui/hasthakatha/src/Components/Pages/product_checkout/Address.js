import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Address(props) {
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
    return (
        <>
            {
                addressList.map((a, i) => {
                    return (
                        <div className="checkout-address-list" key={i}>
                            <div className="address-bar">
                                <p className="name">{a.name}</p>
                                <p className="address">{a.address}</p>
                                <p className="phone-number">Phone number- {a.phone}</p>
                                <button onClick={() => props.setDeliveryAddress(a)} className="waves-effect waves-light btn btn-color">Delivery Here</button>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Address;
