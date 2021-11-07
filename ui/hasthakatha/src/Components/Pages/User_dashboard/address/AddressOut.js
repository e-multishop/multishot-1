import React from 'react';

const AddressOut = (props) => {
    return (
            props.address ?
            <div>
                <p><h6>{props.address.name}</h6></p>
                <p>{props.address.address}</p>
                <p>{props.address.city}, {props.address.state}</p>
                <p>{props.address.phone}</p>
            </div> : ''
    )
}

export default AddressOut;