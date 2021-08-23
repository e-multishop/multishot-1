import React from 'react';
import BestSelling from './BestSelling';
// import Banner from "../../../Images/banner.jpg"
import './home.scss';
import Banner from "./Banner";
import Reviews from "./Reviews";
import Aboutmain from "./About_main"
import About from '../About/About';
import Collabaration from "./Collaboration";
import Team from './Team';
const Home =()=>{
    
    return(
        <>
            <div className="row">
                <div className="col s12 no-padding">
                    {/* <img src={banner} alt=""/> */}
                    <Banner/>
                </div>
            </div>
            <div className="hk-homecontent">
             <BestSelling/>
             <Aboutmain/>
             <Reviews/>
             <Collabaration/>
             <Team/>
            </div>

        </>
    );
}

export default Home;