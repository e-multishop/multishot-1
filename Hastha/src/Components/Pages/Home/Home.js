import React from 'react';
import Featur from './Feature';
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
            <Featur/>
        </>
    );
}

export default Home;