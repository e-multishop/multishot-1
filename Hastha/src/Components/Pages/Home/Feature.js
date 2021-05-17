import React, { useDebugValue } from 'react';
import Card from '../../Card/Card';
import pant from '../../../Images/pant.jpg';
import skirts from '../../../Images/skirts.jpg';
import dresses from '../../../Images/dresses.jpg';
import top from '../../../Images/top.jpg';

const Feature =()=>{
    const temp=[1,2,3,4];
    const img=[pant,skirts,dresses,top];
    const title=["Pant","Skirts","Dresses","Top"];
    return(
        <>
            <div>
                <h3 className="hk-featured">Featured Categories</h3>
            </div>
            <div className="row">
                    {img.map((value)=> {
                       return(
                        <div className="col s4">
                            <Card images={value}/>
                       </div>
                       );   
                    })}
            </div>
        </>
    );
}

export default Feature;