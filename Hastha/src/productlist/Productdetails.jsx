import React,{Component} from 'react';
import "./ProductList.css";

class Productlist extends Component{
    render(){
        return(
          <>
           <div className="hs_product">
            <div className="hs_product_details">
                
                <div className="img1 item1">
                </div>
                <div className="img1 item2">
                </div>
                <div className="img1 item3">
                </div>
                <div className="img1 item4">
                </div>
                <div className="img1 item5">
                </div>
                <div className="img1 item6">
                </div>
            </div>
            <div className="hs_product_side">
                <div className="hs_product_head">
                </div>
                <div className="hs_product_order">
                </div>
            </div>
        </div>
        {/* // <!--review and comment section--> */}
        <div className="hs_review comment">
            <div>
                    Review
            </div>
            <div>

            </div>
        </div>
        {/* // <!--slider section--> */}
        <div className="hs_slider">
        </div>
        </>
        );
    };  
}

export default Productlist;
