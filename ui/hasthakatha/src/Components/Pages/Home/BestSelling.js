import React, { useDebugValue } from 'react';
import Card from '../../Card/Card';
import { Link, NavLink } from 'react-router-dom';
import black_mulmul from '../../../Images/black_mulmul.jpg';
import jumpsuit from '../../../Images/jumpsuit.jpg';
import red_kantha from '../../../Images/red_kantha.jpg';
import cushion from '../../../Images/cushion.jpg';

const BestSelling = () => {
    const temp = [1, 2, 3, 4];
    const img = [black_mulmul, jumpsuit, red_kantha, cushion];
    const title = ["Black mulmul mirror work maxi dress ", "Beige Linen Jumpsuit ", "Red Kantha Wrap Dress", "Cushion Price"];
    return (
        <>
            <div>
                <h2 className="hk-feature">Bestselling Products</h2>
            </div>
            <div className="row">
                {/* {img.map((value) => { */}
                {/* return ( */}
                <div className="col s3">
                    <Link to={"/productdetails/"+'84'}><Card images={black_mulmul} banner={true} title="Black mulmul mirror work maxi dress" action={true} description="₹ 3500" /></Link>
                </div>
                <div className="col s3">
                    <Link to={"/productdetails/"+'85'}><Card images={jumpsuit} banner={true} title="Beige Linen Jumpsuit" action={true} description="₹  3500" /></Link>
                </div>
                <div className="col s3">
                    <Link to={"/productdetails/"+'86'}><Card images={red_kantha} banner={true} title="Red Kantha Wrap Dress " action={true} description="₹  5900" /></Link>
                </div>
                <div className="col s3">
                    <Link to={"/productdetails/"+'87'}><Card images={cushion} banner={true} title="Hand Painted and Embroidered Linen Cushion Cover" action={true} description="₹ 2500" /></Link>
                </div>
                {/* );
                })} */}
            </div>
        </>
    );
}

export default BestSelling;