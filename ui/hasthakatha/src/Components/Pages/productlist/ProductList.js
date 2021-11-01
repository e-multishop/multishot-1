import React, { Component, useEffect, useState } from 'react';
import "./ProductList.scss";
import { Link, NavLink } from 'react-router-dom';
import {cartItems} from '../../../Redux/actions/index';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import Pagination from './Pagination';
import Loader from "../../Common/Loader";
import Axios from 'axios';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

const ProductList = (props) => {
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [Loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [itemLoader, setItemLoader] = useState({
        index: -1,
        loading: false
    });
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
    const addToCartData=(value, index)=>{
        const isLoggedIn = localStorage.getItem('token');
        if (!isLoggedIn) {
            props.history.push({ 
                pathname: '/login', 
                search: '?redirect_path=' + props.location.pathname
            })
            return;
        }
        setItemLoader({index, loading: true});
        Axios.post('/rest/add_to_cart',{
            pid : value.pid,
            uid : localStorage.getItem('userId'),
            quantity : "1",
        }).then(res=>{
            toast.success(<span ><FontAwesomeIcon icon={faCheck} size='lg' color="white" className="icon toast-icon" />Item added to cart</span>)
            const userId=localStorage.getItem('userId')
            Axios.get('/rest/add_to_cart/number_of_items/'+userId).then(res=>{
                const numberOfItems=res.data.number_of_items;                
                dispatch(cartItems(numberOfItems));
                setItemLoader({index: -1, loading: false});
            })
        }).catch(err => {
            toast.error('Error adding to cart. Please try again');
            setItemLoader({index: -1, loading: false});
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
            <Header />

            {/* shop badge */}
            <div className="shop-badge">
                Shop
            </div>
            { false ? '' :
                <div>
                    <div className="hk-filter">
                        <div className=" heading">Items</div>
                        {/* <div className=" button-filter">
                            Short : most recent
                        </div> */}
                    </div>
                    {/* <!--product main_list--> */}

                    <div class="hs-container">
                        {/* <!--product side list category--> */}
                        <div class="side_category">
                            <div onClick={() => getProductByCategory(0)}>All</div>
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
                                { 
                                    Loading ? <div className="loader"><Loader /></div> : 
                                        <>
                                    {
                                        product && product.length === 0 
                                        ? showEmptyData() 
                                        : product.map((value, index) => {
                                            return (
                                                <>
        
                                                    <div className="hk-product_card" key={index}>
                                                        <Link to={"/productdetails/"+value.pid}>
                                                            <div className="img-wraper">
                                                                {/* {const url= atob(value.url)} */}
                                                                {
                                                                    value.image_data ? image_url(value.image_data) : <b className="hs-image-preview">No preview</b>
                                                                }
                                                                {/* <p>{avalue.image_data}</p> */}
                                                                {/* <img src={image_url} /> */}
                                                            </div>
                                                            <div className="description">
                                                                {value.title}
                                                            </div>
                                                            <div className="price">
                                                                &#8377; {value.price}
                                                            </div>
                                                        </Link>
                                                        <div className="hk-addcard" onClick={() => {addToCartData(value, index)}}>
                                                            { itemLoader.loading && itemLoader.index === index 
                                                                ? <Loader inline="true" height="unset" />
                                                                : <a>ADD TO CART</a>
                                                            }
                                                        </div>
                                                    </div>
        
                                                </>
                                            );
                                        })
                                    }
                                    </>
                                
                                }
                            </div>
                            {
                                !Loading && product && product.length > 0 
                                    ?  <div className="center-align pagination">
                                            <Pagination pageSize={pageSize} setPageSize={setPageSize} totalRecords={totalRecords} setPageNumber={setPageNumber} pageNumber={pageNumber} />
                                        </div>
                                    : ''
                            }
                        </div>
                            
                    </div>
                </div>}
            <Footer/>
        </>
    );
}

export default ProductList;
