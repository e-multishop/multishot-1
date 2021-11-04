import React from 'react'
import banner1 from '../../../Images/banner1.png';
import banner2 from '../../../Images/banner2.png';
import banner3 from '../../../Images/banner3.png';
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
                    <img src={banner2} />
                </div>
                <div>
                    <img src={banner3} />
                </div>
      </Carousel>
    );
}


export default Banner;
