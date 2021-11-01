import React, { useEffect, useState } from 'react'
import './address.scss';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { toast } from 'react-toastify';

function Address_list(props) {
    const [addressList, setAddressList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteAddressID, setDeleteAddressID] = useState('');
    const [modalInstance, setModalInstance] = useState('');
    const init = () => {
        var elems = document.querySelectorAll('.delete_modal');
        const options = {};
        var instances = M.Modal.init(elems, options);
        setModalInstance(instances[0]);
    };
    const getData = () => {
        axios.get('/rest/address_list/'+localStorage.getItem('userId')).then(res => {
            setAddressList(res.data.result);
            setLoading(false);
        });
    }
    useEffect(() => {
        getData();
        init();
    }, []);
    const updateAddress = () => {
        axios.put('/rest/address').then(res => {

        });
    };
    const editAddress = (address) => {
        props.history.push('/account/editaddress/' + address.id,{mode: 'edit'});
    }
    const deleteAddress = () => {
        const userId = localStorage.getItem('userId');
        const addressID = deleteAddressID;
        axios.delete(`/rest/address/${userId}/${addressID}`).then(addressID => {
            getData();
            toast.success('Deleted successfully');
        }).catch(e => {
            toast.error('Error deleting address');
        })
    };
    const cancelModal = (e) => {
        e.preventDefault();
        modalInstance.close();
    };
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
                                    <button className="btn modal-trigger white black-text" onClick={() => editAddress(a)}>Edit</button>
                                    {/* <p onClick={() => deleteAddress(a.id)}>Delete</p> */}
                                    <button onClick={() => setDeleteAddressID(a.id)} data-target="delete_modal" className="btn modal-trigger white black-text hs-ml-16">Delete</button>
                            </div>
                        </div>
                    )
                })
            }
            <div id="delete_modal" className="modal delete_modal">
                <div className="modal-content">
                <h6>Confirm delete</h6>
                <p>Are you sure?</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect btn-flat" onClick={cancelModal}>Cancel</a>
                    <a className="modal-close waves-effect btn-flat" onClick={deleteAddress}>Ok</a>
                </div>
            </div>
        </div>
    )
}

export default Address_list;
