import React from 'react';
import "./card.css";
const Card =(props)=>{
    return(
        <div className="card hk-card">
                <div className="card-image">
                    <img src={props.images}/>
                    <span className="card-title" >Card Title</span>
                </div>
                <div classname="card-action">
                    <a href="#">This is a link</a>
                </div>
        </div>
    );
}

export default Card;