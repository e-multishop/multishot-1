import React from 'react'
import Sidebar from '../sidebar/Sidebar'

function Account() {
    // const cartData = useSelector((state) => state.cartItems);
    // console.log("cart data check =", cartData);
    return (
        <div className="hk-container">
            <div>
                    <div className="row">
                        <div className="col s3">
                            <Sidebar/>
                        </div>
                        <div className="col s9">
                            <h1>side bar</h1>
                        </div>
                    </div>
                </div>
        </div>
        // <h1>adsfsdjf</h1>
    );
}

export default Account;
