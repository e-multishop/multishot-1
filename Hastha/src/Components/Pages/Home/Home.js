import React from 'react';
import BestSelling from './BestSelling';
import banner from "../../../Images/banner.jpg"
import './home.css'
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
            </div>
        </>
    );
}

export default Home;