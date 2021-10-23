import React from 'react'

function Delivery() {
    return (
        <>
            <div class="row">
                <div class="col s12 m6">
                    <div class="card darken-1">
                        <div class="card-content text-green">
                            <span class="card-title text-green">Free Delivery</span>
                        </div>
                        <div class="card-action">
                            <button className="waves-effect waves-light btn btn-color">Continue</button>
                        </div>
                    </div>
                </div>
                <div class="col s12 m6">
                    <div class="card ">
                        <div class="card-content ">
                            <span class="card-title">Express Delivery</span>
                            <p>$15 Charge</p>
                        </div>
                        <div class="card-action">
                            <button className="waves-effect waves-light btn btn-color">Continue</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="main-section-delivery">
            <div className="free-delivery">
                Fee Delivery
            </div>
            <div className="express-delivery">
                Express Dilivery
                <br/>$15 Charge
            </div>
        </div>
        <button className="waves-effect waves-light btn btn-color">Continue</button> */}
        </>
    )
}

export default Delivery;
