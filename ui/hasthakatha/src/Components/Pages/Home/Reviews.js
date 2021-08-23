import React from 'react';
import Slider from '../../Shared/CardSlider/Slider';


const Reviews=()=>{
    const reviews=[
        {
            description:'Absolutely fantastic quality & price. Quick & efficient communication and delivery. I would highly recommend Divya & Ekta if anyone considering buying.',
            footer:<div>
                        <p className="font-bold">Tristanleela</p>
                        {/* <p>CEO-Tattva Sutra, </p>
                        <p>USA</p> */}
                    </div>
        },
        {
            description:"I love these dresses and have ordered several already! They are so simple and beautiful at the same time. Ekta and Divya's work is always excellent! Thank you ladies!!!",
            footer:<div>
                <p className="font-bold">Nexphaze</p>
                {/* <p>CEO-Tattva Sutra, </p>
                <p>USA</p> */}
            </div>
            
        },
        {
            description:'I love my pants. They were sewn to my measurements and fit perfectly. Beautifully crafted, comfortable and light weight. I highly recommend this shop! 🌞',
            footer:<div>
                <p className="font-bold">Rachel</p>
                {/* <p>CEO-Tattva Sutra, </p>
                <p>USA</p> */}
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