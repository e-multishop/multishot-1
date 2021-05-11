import React, { useDebugValue } from 'react';
import Card from '../../Card/Card';

const Feature =()=>{
    const temp=[1,2,3,4];
    return(
        <>
            <div>
                <h3>Featured Categories</h3>
            </div>
            <div className="row">
                    {temp.map(value => {
                       return(
                        <div className="col s4">
                       <Card/>
                       </div>
                       );   
                    })}
            </div>
        </>
    );
}

export default Feature;