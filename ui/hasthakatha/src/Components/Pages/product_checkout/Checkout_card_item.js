import Axios from 'axios';
import React, { useEffect } from 'react'
import "./checkout.scss";

function Checkout_card_item(props) {

    useEffect(() => {
        const dropdown1 = document.getElementById("select-quantity");
        const elems = dropdown1.querySelectorAll('select');
        const options = {};
        var instances = M.FormSelect.init(elems, options);
    },[]);
    // console.log("propsdata=",props);
    const handleRemove=()=>{
        Axios.delete('/rest/add_to_cart/'+props.id).
        then(res=>{
            console.log(res.data);
            const userId=localStorage.getItem('userId');
            props.getCart(userId);
        })
    }
    return (
        <div className="card-item-flex " >
            <div className="item-image">
                <img src={props.imgdata} />
            </div>
            <div className="item-content">
                <p className="title">{props.producttitle}</p>
                <p>Size: XS US women's letter</p>
                <p>Primary color : white</p>
                <div className="save-remove">
                    {/* <p>Save for later</p> */}
                    <p onClick={()=>{handleRemove()}}> Remove</p>
                </div>
            </div>
            <div className="item-quantity">
                <div id="select-quantity" className="col s12 ">
                    <select class="browser-default z-depth-1">
                        {/* <option value="" disabled selected>1</option> */}
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </div>
            </div >

            <div className="item-price text-center">
                <p>₹ {props.productprice}</p>
            </div>
        </div>
    );
}

export default Checkout_card_item;
