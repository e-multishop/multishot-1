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
import Axios from 'axios';

class Productdetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
            pid: '',
            productdetail: {},
            sizes: []
        }
    }

    componentWillMount() {
        const pid = this.props.match.params.pid;
        this.setState({pid: pid});
        Axios.get('rest/productdetails/'+pid).then(response => {
            this.setState({productdetail: response.data.output})
        })
        this.loadProductSize(pid);
    }
   
    componentDidUpdate() {
        const insertproduct = document.getElementById("hs_product_details");
        const elems = insertproduct.querySelectorAll('select');
        const options = {};
        var instances = M.FormSelect.init(elems, options);
    }

    loadProductSize(pid) {
        Axios.get('/rest/productsize/'+pid).then(res => {
            this.setState({sizes: res.data.output});
        });
    }

    getSizeOptions() {
        return this.state.sizes.map(s => <option >{s.name}</option>)
    }

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
           <div className="hs_product" id="hs_product_details">
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
                        <img src={this.state.productdetail.image_data} alt="product image" />
                    </div>
                </div>
                <div className="hs_product_side">
                    <div className="hs_product_head">
                        <NavLink to="/"><p>HasthaKatha</p></NavLink>
                        <div className="hk-rating">
                            {/* <div>
                                <p><FontAwesomeIcon icon={faMapMarkerAlt}/> Seller</p>
                            </div> */}
                            {/* <div className="sales">
                                927 sales
                            </div> */}
                            <div > 
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                            </div>
                        </div>
                        <h1>
                            { this.state.productdetail.title }
                        </h1>
                        <div className="price-section">
                                <div className="hk-product-price">
                                    <h2>Rs. {this.state.productdetail.price}</h2>
                                    {/* <p>Local taxes included (where applicable)</p> */}
                                </div>
                                <p className="stock"><FontAwesomeIcon icon={faCheck}/> In stock </p>
                        </div>
                    </div>
                    <div className="hs_product_order">
                        
                        <div>
                            <div class="input-field col s12">
                                <select>
                                    <option value="" disabled selected>Choose size</option>
                                   {this.getSizeOptions()}
                                </select>
                            </div>
                        </div>
                        <div>
                        <div class="input-field col s12">
                                <select>
                                    <option value="" disabled selected>Choose color</option>
                                    <option>Black</option>
                                    <option>Blue</option>
                                    <option>Brown</option>
                                </select>
                            </div>
                            {/* <a class="btn dropdown-trigger hk-btn" href="#!" data-target="dropdown2">Select an option<FontAwesomeIcon icon={faChevronDown}/></a>
                             <p>Add your personalisation</p> */}
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
                    <p classname="hk-review-filter"></p>
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
