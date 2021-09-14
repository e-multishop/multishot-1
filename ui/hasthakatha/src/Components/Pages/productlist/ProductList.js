import React, { Component, useEffect, useState } from 'react';
import "./ProductList.scss";
import { NavLink } from 'react-router-dom';
import { addToCart } from '../../../Redux/actions/index';
import { useDispatch } from 'react-redux';
import Pagination from './Pagination'
import Loader from "../../Shared/loader/Loader"

const ProductList = () => {

    // state = {
    //     categories: [],
    //     product: []
    // };
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState([]);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('rest/categories').then((result) => {
            return (result.json())
        }).then((categories) => {
            setCategories(categories)
        })
        fetch('/rest/product_list/10/1').then((result) => {
            return (result.json())
        }).then((product) => {
            setProduct(product)
            setLoading(false);
        })
    }, []);
    const image_url = (image_data) => {
        var image_url = "data:image/png;base64," + (image_data);
        return (<img src={image_url} />);
    }

    const dispatch = useDispatch();
    var data={};
    return (
        <>

            {/* shop badge */}
            <div className="shop-badge">
                Shop
                    </div>
            {Loading ?
                <div className="loader">
                    <Loader />
                </div> :
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
                                    return (<div>{value.name}</div>)
                                })
                            }
                        </div>
                        {/* <!-- product List--> */}
                        {/* <div> */}
                        <div className="product_list_container">
                            <div class="product_list">
                                {/* <!-- Prodcuct list first row--> */}
                                {/* <!--product details--> */}
                                {product.map((value) => {
                                    return (
                                        <>

                                            <div className="hk-product_card">
                                                <NavLink to="/productdetails">
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
                                                </NavLink>
                                                <div className="hk-addcard" onClick={() => { dispatch(addToCart(
                                                        data = {
                                                            title: value.title,
                                                            description: value.description,
                                                            price: value.price,
                                                 
                                                        }
                                                )) 
                                                }}>
                                                    <a>ADD TO CART</a>
                                                </div>
                                            </div>
                                            {/* <div className="row">
                                <div className="col s3">
                                    <Card images={value.url} banner={true} title={value.title} description={value.price}/>
                                </div>
                            </div> */}

                                        </>
                                    );
                                })
                                }
                            </div>
                            <div className="center-align pagination">
                                <Pagination />
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>}
        </>
    );
}

export default ProductList;
