import React from 'react'
import banner from '../../../Images/banner.jpg';
import banner2 from '../../../Images/banner2.jpg';
import banner1 from '../../../Images/banner1.jpg';

import { Carousel } from 'react-responsive-carousel';

function Banner() {
    return (
      <Carousel 
      dynamicHeight={true} 
      showThumbs={false} 
      showStatus={false} 
      autoPlay={true}
      infiniteLoop={true}
      >
                <div>
                    <img src={banner1} />
                </div>
                <div>
                    <img src={banner} />
                </div>
                <div>
                    <img src={banner2} />
                </div>
      </Carousel>
    );
}


export default Banner;
