import React,{Component} from 'react';
import "./Productdetails.scss";
import imgproduct from '../../../Images/pant.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import ProductReview from './ProductReview';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import Demoimg from '../../../Images/megha.jpg';


class Productdetails extends Component{
   
    render(){
        const ReviewData=[
            {
                CustmerImg:Demoimg,
                CustmerName:"Teresa Fernadez",
                ReviewDate:"10 Apr, 2021",
                ReviewContent:"I wasn’t too sure about what size to order and the seller was able to guide me very well. I got my dress at home and it fits perfectly, the perfect summer dress I’d say. The pockets are absolutely genius! Love it! I’ll definitely order more pieces =)",
                ProductImg: Demoimg,
                PurchaseImg: Demoimg,
                PurchaseName:"Custom made pleated pant for women, Cream linen pant",
            },
            {
                CustmerImg:Demoimg,
                CustmerName:"Teresa Fernadez",
                ReviewDate:"10 Apr, 2021",
                ReviewContent:"I wasn’t too sure about what size to order and the seller was able to guide me very well. I got my dress at home and it fits perfectly, the perfect summer dress I’d say. The pockets are absolutely genius! Love it! I’ll definitely order more pieces =)",
                ProductImg: Demoimg,
                PurchaseImg: Demoimg,
                PurchaseName:"Custom made pleated pant for women, Cream linen pant",
            },
            
        ];
        return(
          <>
           <div className="hs_product">
                <div className="hs_product_details">
                    
                    <div className="img1 item1">
                        <img src={imgproduct} alt="product image" />
                    </div>
                    <div className="img1 item2">
                        <img src={imgproduct} alt="product image" />      
                    </div>
                    <div className="img1 item3">
                    <img src={imgproduct} alt="product image" />
                    </div>
                    <div className="img1 item4">
                        <img src={imgproduct} alt="product image" />
                    </div>
                    <div className="img1 item5">
                        <img src={imgproduct} alt="product image" />
                    </div>
                    <div className="img-main item6">
                        <img src={imgproduct} alt="product image" />
                    </div>
                </div>
                <div className="hs_product_side">
                    <div className="hs_product_head">
                        <NavLink to="/"><p>Hastha Katha</p></NavLink>
                        <div className="hk-rating">
                            <div>
                                <p><FontAwesomeIcon icon={faMapMarkerAlt}/> Seller</p>
                            </div>
                            <div className="sales">
                                927 sales
                            </div>
                            <div > 
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                            </div>
                        </div>
                        <h1>
                        Button-down Lilac Pants, Linen Pants for Women, 
                        Elasticated Pants, Made to Order, Custom Made, Plus Size
                        </h1>
                        <div className="price-section">
                                <div className="hk-product-price">
                                    <h2>US$ 40.00</h2>
                                    <p>Local taxes included (where applicable)</p>
                                </div>
                                <p className="stock"><FontAwesomeIcon icon={faCheck}/> In stock </p>
                        </div>
                    </div>
                    <div className="hs_product_order">
                        
                        <div>
                            <p>Size</p>
                            <ul id="dropdown2" class="dropdown-content">
                                <li><a href="#!">one<span class="badge">1</span></a></li>
                                <li><a href="#!">two<span class="new badge">1</span></a></li>
                                <li><a href="#!">three</a></li>
                            </ul>
                            <a class="btn dropdown-trigger hk-btn" href="#!" data-target="dropdown2">Select an option<FontAwesomeIcon icon={faChevronDown}/></a>            
                        </div>
                        <div>
                             <p>Primary color</p>
                             <ul id="dropdown2" class="dropdown-content">
                                <li><a href="#!">one<span class="badge">1</span></a></li>
                                <li><a href="#!">two<span class="new badge">1</span></a></li>
                                <li><a href="#!">three</a></li>
                            </ul>
                            <a class="btn dropdown-trigger hk-btn" href="#!" data-target="dropdown2">Select an option<FontAwesomeIcon icon={faChevronDown}/></a>
                             <p>Add your personalisation</p>
                        </div>
                        <div className="hk-addcard">
                                    <a href="#">ADD TO CART</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* // <!--review and comment section--> */}
            <div className="hs_review comment">
                <div className="hk-review-head">   
                    <h2 className="hk-review-heading">234 Shop reviews</h2>
                    <p classname="hk-review-filter">sfdfsdf</p>
                </div>
                <div>
                    {
                        ReviewData.map((value)=>{
                          return(
                            <>
                                <ProductReview
                                    CustmerImg={value.CustmerImg}
                                    CustmerName={value.CustmerName}
                                    ReviewDate={value.ReviewDate}
                                    ReviewContent={value.ReviewContent}
                                    ProductImg={value.ProductImg}
                                    PurchaseImg={value.PurchaseImg}
                                    PurchaseName={value.PurchaseName}
                                />
                            </>
                          );  
                        })   
                    }
                    
                </div>
            </div>
            {/* // <!--slider section--> */}
            <div className="hs_slider">
            </div>
        </>
        );
    };  
}

export default Productdetails;
