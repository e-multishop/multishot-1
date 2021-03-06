import React, { useDebugValue } from 'react';
import logo from '../../../Images/logo2.jpg';
const Aboutmain =()=>{
   return(
        <>            
           
            <div className="hk-about-body ">
                <div className="hk-logo_about">
                    <img src={logo} alt="Logo" srcset=""/>
                </div>
                <div className="hk-about-para ">
                    <h3 className="hk-about">About Us</h3>
                    <p className="hk-about-content">If the cultural diversity and traditional vibrancy of India intrigues you, then you are in the right place. </p>
                    <p>Welcome to Hasthakatha! The rural folk art and textiles of India is the true reflection of the rich heritage of the country.
                     The artistry and intricacy achieved by Indian handmade textiles is supreme and beyond the reach of modern machinery. 
                     At Hasthakatha we intend to combine folk art and traditional textiles with modern aesthetics to retain the heritage vale of handmade art work. 
                     The brand aims to create unique, comfortable and wearable handmade garments for the modern women at the same time enabling a better livelihood for rural Indian artisans and craftsmen. </p>
                     <p>
                     I like to keep the silhouette of my garment simple so that it can suit anybody irrespective of their body type. What sets
                     my garment apart is that I experiment with different kinds of hand embroideries, hand paintings and mirror work.
                     </p>
                </div>
                
            </div>
        </>
    );
}

export default Aboutmain;