import React, { useState } from 'react';
import "./card.scss";
const Card =(props)=>{

    return(
        <div className="card hk-card">
            {
                props.banner?
                <div className="card-image">
                    <img src={props.images}/>
                </div> :''
            }
                <div className="card-content">
                    {
                        props.title?
                        <h2>{props.title}</h2>:''
                    }
                    {     
                        props.description?                  
                     <h6>{props.description}</h6>:''

                    }
                    {
                        props.action?
                        <div className="hk-addcard">
                             <a href="#">ADD TO CART</a>
                        </div>:''
                    }
                    {
                        props.footer?props.footer:''
                    }
                     
                </div>             
        </div>
    );
}

export default Card;