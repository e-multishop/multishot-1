import React from 'react';
import "./card.scss";
const Card =(props)=>{
    return(
        <div className="card hk-card">
                <div className="card-image">
                    <img src={props.images}/>
                </div> 
                <div className="card-content">
                    <h2>Black Maxi Dress </h2>
                    <h6>₹ 999</h6>
                    <div className="hk-addcard">
                        <a href="#">ADD TO CART</a>
                    </div>  
                </div>             
                <div classname="card-action">
                                      
                </div>
        </div>
    );
}

export default Card;