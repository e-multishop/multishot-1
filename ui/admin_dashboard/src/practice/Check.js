import React from  'react';

function Check(props){
    console.warn("props=",props);
    return(
        <div>
            <h1>Check component</h1>
            <div>cart-0</div>
            <div className="">
                <span>
                    i phone
                </span>
                <span>
                    Price:3005
                </span>
                <div>
                    <button 
                    onClick={
                        ()=>{props.addToCartHandler({name:"i phone",price:"3000"})}
                    }>
                    Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default Check;