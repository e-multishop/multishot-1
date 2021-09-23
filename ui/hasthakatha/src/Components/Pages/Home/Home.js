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
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
const Home =()=>{
    
    return(
        <>
            <Header />
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
            <Footer/>
        </>
    );
}

export default Home;