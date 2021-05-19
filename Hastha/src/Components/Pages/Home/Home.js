import React from 'react';
import BestSelling from './BestSelling';
import banner from "../../../Images/banner.jpg"
import './home.scss';

import Reviews from "./Reviews";
const Home =()=>{
    
    return(
        <>
            <div className="row">
                <div className="col s12">
                    <img src={banner} alt=""/>

                </div>
            </div>
            <div className="hk-homecontent">
             <BestSelling/>
             <Reviews/>
            </div>

        </>
    );
}

export default Home;