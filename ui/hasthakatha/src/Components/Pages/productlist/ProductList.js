import React, { Component, useEffect, useState } from 'react';
import "./ProductList.scss";
import { Link, NavLink } from 'react-router-dom';
import {cartItems} from '../../../Redux/actions/index';
import { useDispatch } from 'react-redux';
import Pagination from './Pagination'
import Loader from "../../Shared/loader/Loader"
import Axios from 'axios'
const ProductList = () => {

    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [Loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    
    const getProduct=(pageNumber)=>{
        setLoading(true);
        fetch('/rest/product_list/'+pageSize+'/'+pageNumber).then((result) => {
            return (result.json())
        }).then((product) => {
            setProduct(product.list)
            setTotalRecords(product.totalRecords);
            setLoading(false);
        })
    }
    useEffect(() => {
        fetch('rest/categories').then((result) => {
            return (result.json())
        }).then((categories) => {
            setCategories(categories)
        })
        getProduct(pageNumber);
    }, []);

    useEffect(() => {
        getProduct(pageNumber);
    }, [pageNumber])
    const image_url = (image_data) => {
        return (<img src={image_data} />);
    }
  
    const dispatch = useDispatch();
    var data={};
    const showEmptyData = () => {
        return (
            <div className="hs-no-products">
                <p>No products found.</p>
            </div>
        )
    }
    const addToCartData=(value)=>{
        Axios.post('/rest/add_to_cart',{
            pid : value.pid,
            uid : localStorage.getItem('userId'),
            quantity : "1",
        }).then(res=>{
            const userId=localStorage.getItem('userId')
            Axios.get('/rest/add_to_cart/number_of_items/'+userId).then(res=>{
                const numberOfItems=res.data.number_of_items;                
                dispatch(cartItems(numberOfItems))
            })
        })
    }
    const getProductByCategory = (category) => {
        setLoading(true);
        setPageNumber(1);
        Axios.get(`/rest/product_list_by_category/${category}/${pageSize}/1`).then(res => {
            const product = res.data;
            setProduct(product.list)
            setTotalRecords(product.totalRecords);
            setLoading(false);
        });
    }
    return (
        <>

            {/* shop badge */}
            <div className="shop-badge">
                Shop
                    </div>
            { false ? '' :
                <div>
                    <div className="hk-filter">
                        <div className=" heading">Items</div>
                        <div className=" button-filter">
                            Short : most recent
                        </div>
                    </div>
                    {/* <!--product main_list--> */}

                    <div class="hs-container">
                        {/* <!--product side list category--> */}
                        <div class="side_category">
                            <div>All</div>
                            {
                                categories.map((value) => {
                                    return (<div onClick={() => getProductByCategory(value.cid)}>{value.name}</div>)
                                })
                            }
                        </div>
                        {/* <!-- product List--> */}
                        {/* <div> */}
                        <div className="product_list_container">
                            <div class="product_list">
                                {/* <!-- Prodcuct list first row--> */}
                                {/* <!--product details--> */}
                                { Loading ? <div className="loader"><Loader /></div> : product.map((value, index) => {
                                    return (
                                        <>

                                            <div className="hk-product_card" key={index}>
                                                <Link to={"/productdetails/"+value.pid}>
                                                    <div className="img-wraper">
                                                        {/* {const url= atob(value.url)} */}
                                                        {
                                                            value.image_data ? image_url(value.image_data) : ""
                                                        }
                                                        {/* <p>{avalue.image_data}</p> */}
                                                        {/* <img src={image_url} /> */}
                                                    </div>
                                                    <div className="description">
                                                        {value.title}
                                                    </div>
                                                    <div className="price">
                                                        {value.price}
                                                    </div>
                                                </Link>
                                                <div className="hk-addcard" onClick={() => {addToCartData(value)}}>
                                                    <a>ADD TO CART</a>
                                                </div>
                                            </div>

                                        </>
                                    );
                                })
                                }
                            </div>
                            {
                                product && product.length === 0 
                                ? showEmptyData() 
                                :   <div className="center-align pagination">
                                        <Pagination pageSize={pageSize} setPageSize={setPageSize} totalRecords={totalRecords} setPageNumber={setPageNumber} pageNumber={pageNumber} />
                                    </div>
                            }
                        </div>
                        {/* </div> */}
                    </div>
                </div>}
        </>
    );
}

export default ProductList;
