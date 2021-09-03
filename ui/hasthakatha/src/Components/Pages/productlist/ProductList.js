import React, { Component, useEffect, useState } from 'react';
import "./ProductList.scss";
import { NavLink } from 'react-router-dom';
import { addToCart } from '../../../Redux/actions/index';
import { useDispatch } from 'react-redux';

const ProductList = () => {

    // state = {
    //     categories: [],
    //     product: []
    // };
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch('rest/categories').then((result) => {
            return (result.json())
        }).then((categories) => {
            setCategories(categories)
        })
        fetch('/rest/product_list').then((result) => {
            return (result.json())
        }).then((product) => { setProduct(product) })
    }, []);


    const dispatch = useDispatch();
    const data = {
        title: "check title",
        description: "check description",
        price: "check price"
    }
    var image_url;
    console.warn("checku url",image_url);

    return (
        <>
            {/* shop badge */}
            <div className="shop-badge">
                Shop
                </div>
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
                                                    //  image_url=atob(value.image_data)
                                            }
                                            {/* <p>{avalue.image_data}</p> */}
                                            <img src={value.image_data} />
                                        </div>
                                        <div className="description">
                                            {value.title}
                                        </div>
                                        <div className="price">
                                            {value.price}
                                        </div>
                                    </NavLink>
                                    <div className="hk-addcard" onClick={() => { dispatch(addToCart(data)) }}>
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
                {/* </div> */}
                {/* <Pagination/> */}

            </div>
        </>
    );
}

export default ProductList;
