import React,{Component} from 'react';
import "./Productdetails.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import ProductReview from './ProductReview';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import Demoimg from '../../../Images/megha.jpg';
import Axios from 'axios';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

class Productdetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
            pid: '',
            productdetail: {},
            sizes: [],
            mainImage: '',
            imgproduct1: '',
            imgproduct2: '',
            imgproduct3: '',
            imgproduct4: '',
            imgproduct5: '',
            loading: true,
            reviewList: [],
            reviewsLoading: true
        }
    }

    componentWillMount() {
        const pid = this.props.match.params.pid;
        this.setState({pid: pid});
        Axios.get('rest/productdetails/'+pid).then(response => {
            this.setState({productdetail: response.data.output, mainImage: response.data.output.image_data, loading: false});
            Axios.get('/rest/reviews/'+pid).then(response => {
                this.setState({reviewList: response.data.result, reviewsLoading: false});
            });
            this.loadProductSize(pid);
        });
        Axios.get('/rest/productdetails/images/'+pid).then(response => {
            const result = response.data.result;
            if (result && result.length > 0) {
                this.setState({
                    imgproduct1: result[0] && result[0]['image_data'] ? result[0]['image_data'] : '',
                    imgproduct2: result[1] && result[1]['image_data'] ? result[1]['image_data'] : '',
                    imgproduct3: result[2] && result[2]['image_data'] ? result[2]['image_data'] : '',
                    imgproduct4: result[3] && result[3]['image_data'] ? result[3]['image_data'] : '',
                    imgproduct5: result[4] && result[4]['image_data'] ? result[4]['image_data'] : ''
                })
            }
        });
    }
   
    componentDidUpdate() {
        const insertproduct = document.getElementById("hs_product_details");
        if (insertproduct) {
            const elems = insertproduct.querySelectorAll('select');
            if (elems) {
                const options = {};
                var instances = M.FormSelect.init(elems, options);
            }
        }
    }

    loadProductSize(pid) {
        Axios.get('/rest/productsize/'+pid).then(res => {
            this.setState({sizes: res.data.output});
        });
    }

    getSizeOptions() {
        return this.state.sizes.map(s => <option >{s.name}</option>)
    }

    setMainImage(image) {
        this.setState({mainImage: image});
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
           <Header />
           { 
            this.state.loading === true ? <div className="hs_product_details wrapper"></div> :  
            <>
                <div className="hs_product" id="hs_product_details">
                    <div className="hs_product_details">
                        
                        <div className="img1 item1">
                            <img src={this.state.imgproduct1} alt="product image" onClick={() => this.setMainImage(this.state.imgproduct1)}/>
                        </div>
                        <div className="img1 item2">
                            <img src={this.state.imgproduct2} alt="product image" onClick={() => this.setMainImage(this.state.imgproduct2)}/>      
                        </div>
                        <div className="img1 item3">
                        <img src={this.state.imgproduct3} alt="product image" onClick={() => this.setMainImage(this.state.imgproduct3)}/>
                        </div>
                        <div className="img1 item4">
                            <img src={this.state.imgproduct4} alt="product image" onClick={() => this.setMainImage(this.state.imgproduct4)}/>
                        </div>
                        <div className="img1 item5">
                            <img src={this.state.imgproduct5} alt="product image" onClick={() => this.setMainImage(this.state.imgproduct5)}/>
                        </div>
                        <div className="img-main item6">
                            {
                                this.state.mainImage
                                    ? <img src={this.state.mainImage} alt="product image" />
                                    : <b className="hs-image-preview">Image preview not available</b>
                            }
                        </div>
                    </div>
                    <div className="hs_product_side">
                        <div className="hs_product_head">
                            {/* <NavLink to="/"><p>HasthaKatha</p></NavLink> */}
                            <div className="hk-rating">
                                {/* <div>
                                    <p><FontAwesomeIcon icon={faMapMarkerAlt}/> Seller</p>
                                </div> */}
                                {/* <div className="sales">
                                    927 sales
                                </div> */}
                                {/* <div > 
                                    <FontAwesomeIcon icon={faStar}/>
                                    <FontAwesomeIcon icon={faStar}/>
                                    <FontAwesomeIcon icon={faStar}/>
                                    <FontAwesomeIcon icon={faStar}/>
                                    <FontAwesomeIcon icon={faStar}/>
                                </div> */}
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
                        <h2 className="hk-review-heading">{this.state.reviewList.length} reviews</h2>
                        <p className="hk-review-filter"></p>
                    </div>
                    <div>
                        {
                            this.state.reviewList.map((value)=>{
                            return(
                                <ProductReview
                                    CustmerImg={value.CustmerImg}
                                    CustmerName={value.CustmerName}
                                    ReviewDate={value.created_date}
                                    ReviewContent={value.description}
                                    ProductImg={value.ProductImg}
                                    PurchaseImg={value.PurchaseImg}
                                    PurchaseName={value.PurchaseName}
                                    Rating={value.rating}
                                    UserID={value.uid}
                                />
                            );  
                            })   
                        }
                        
                    </div>
                </div>
                {/* // <!--slider section--> */}
                <div className="hs_slider">
                </div>
            </>
            }
            <Footer />
        </>
        );
    };  
}

export default Productdetails;
