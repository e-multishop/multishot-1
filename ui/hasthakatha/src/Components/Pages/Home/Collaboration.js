import React from 'react';
import Card from '../../Card/Card';
import megha from '../../../Images/megha.jpg';
import shilpi from '../../../Images/shilpisingh09_c.jpg';
import riya from '../../../Images/dpx_girl.jpg';
import dibyasha_c from '../../../Images/dibyasha_c.jpg';


const Collabaration = () => {
    // const img = [megha, shilpi, dpx_girl];
    const data = [
                {
                    img:megha,
                    name:"Megha"
                },
                {
                    img:shilpi,
                    name: "Shilpi Singh"
                },
                {
                    img:riya,
                    name:"Riya"
                }
    ]
    return (
        <>
            <div>
                <h2 className="hk-feature">Our Style Divas</h2>
            </div>
            <div className="row">
                {data.map((value) => {
                    return (
                        <div className="col s4">
                            <Card images={value.img} banner={true} title={value.name} />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
export default Collabaration;