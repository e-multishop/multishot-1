import React from 'react';

const Card =()=>{
    return(
        <div className="card">
                <div className="card-image">
                    <img src="images/sample-1.jpg"/>
                    <span className="card-title">Card Title</span>
                </div>
                <div classname="card-action">
                    <a href="#">This is a link</a>
                </div>
        </div>
    );
}

export default Card;