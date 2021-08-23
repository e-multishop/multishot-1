import React from  'react';
import Card from '../../Card/Card';
import megha from '../../../Images/megha.jpg';
import shilpi from '../../../Images/shilpisingh09_c.jpg';
import dpx_girl from '../../../Images/dpx_girl.jpg';
import dibyasha_c from '../../../Images/dibyasha_c.jpg';


const Collabaration =()=>{
    const img=[megha,shilpi,dpx_girl];
    return(
        <>
            <div>
                <h2 className="hk-feature">Collabaration</h2>
            </div>
            <div className="row">
                    {img.map((value)=> {
                       return(
                        <div className="col s4">
                            <Card images={value} banner={true} title="Model Name" />
                       </div>
                       );   
                    })}
            </div>
        </>
    );
}
export default Collabaration;