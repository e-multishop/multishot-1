import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import Header from '../../../Header/Header';
import Footer from '../../../Footer/Footer';
import OrderList from './OrderList';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';

function Order() {
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        const uid = localStorage.getItem('userId');
        Axios.get('/rest/order/list/'+uid).then(res => {
            setOrderList(res.data);
        });
    }, []);
    return ( 
        <>
            <div className="hk-container">
                <div>
                    <div className="row">
                        <div className="col s12">
                            {
                                orderList.map (o => {
                                    return (
                                        <NavLink to={'/orderdetails/'+o.order_id}><OrderList {...o}/></NavLink>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Order;
