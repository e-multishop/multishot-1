import React, { useDebugValue } from 'react';
import Card from '../../Card/Card';
import pant from '../../../Images/pant.jpg';
import skirts from '../../../Images/skirts.jpg';
import dresses from '../../../Images/dresses.jpg';
import top from '../../../Images/top.jpg';

const BestSelling =()=>{
    const temp=[1,2,3,4];
    const img=[pant,skirts,dresses,top];
    const title=["Pant","Skirts","Dresses","Top"];
    return(
        <>
            <div>
                <h2 className="hk-featured">Bestselling Products</h2>
            </div>
            <div className="row">
                    {img.map((value)=> {
                       return(
                        <div className="col s3">
                            <Card images={value} banner={true} title="Black Maxi Dress" action={true} description="₹ 9967"/>
                       </div>
                       );   
                    })}
            </div>
        </>
    );
}

export default BestSelling;