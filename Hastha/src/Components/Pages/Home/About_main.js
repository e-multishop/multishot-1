import React, { useDebugValue } from 'react';
import logo from '../../../Images/logo.png';
const Aboutmain =()=>{
   return(
        <>            
           
            <div className="hk-about-body ">
                <div className="hk-about-para ">
                    <h3 className="hk-about">About Us</h3>
                    <h3 className="hk-about-content">HasthaKatha Hastha is an ethnic brand of handblock printed apparel, umbrellas and table linen. 
                       <br/> We draw inspiration from traditional Indian arts and use a contemporary canvas to showcase them.
                    </h3>
                </div>
                <div className="hk-logo_about">
                    <img src={logo} alt="Logo" srcset=""/>
                </div>
            </div>
        </>
    );
}

export default Aboutmain;