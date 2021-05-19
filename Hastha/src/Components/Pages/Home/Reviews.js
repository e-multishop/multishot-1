import React from 'react';
import Slider from '../../Shared/CardSlider/Slider';


const Reviews=()=>{
    const reviews=[
        {
            description:'First Water products are out of this world! The serum is like an elixir. It has changed my skin completely.',
            footer:<div>
                        <p className="font-bold">Mr. Ashish Kumar Kushwaha</p>
                        <p>CEO-Tattva Sutra, </p>
                        <p>USA</p>
                    </div>
        },
        {
            description:'First Water products are out of this world! The serum is like an elixir. It has changed my skin completely.',
            footer:<div>
                <p className="font-bold">Mr. Ashish Kumar Kushwaha</p>
                <p>CEO-Tattva Sutra, </p>
                <p>USA</p>
            </div>
            
        },
        {
            description:'First Water products are out of this world! The serum is like an elixir. It has changed my skin completely.',
            footer:<div>
                <p className="font-bold">Mr. Ashish Kumar Kushwaha</p>
                <p>CEO-Tattva Sutra, </p>
                <p>USA</p>
            </div>
            
        }
    ]
    return(
        <>
            <div className="hk-review">
                <h1>Reviews</h1>
                <div className="hk-review-content">
                 <Slider items={reviews}/>
                </div>
            </div>
        </>
    );
}

export default Reviews;