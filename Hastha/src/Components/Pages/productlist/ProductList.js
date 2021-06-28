import React,{Component} from 'react';
import "./ProductList.scss";
import { NavLink } from 'react-router-dom';

class ProductList extends Component{
    state={
        categories:[],
        product:[]
    };
    componentDidMount(){
        fetch('/categories').then((result)=>{
            return(result.json())
        }).then((categories)=>{this.setState({categories:categories})
        })
        fetch('/product').then((result)=>{
            return(result.json())
        }).then((product)=>{this.setState({product:product})})
    };
    render(){
        return(
        <>
        {/* shop badge */}
        <div className="shop-badge">
            Shop
        </div>
        <div className="hk-filter">
            <div className=" heading">Items</div>
            <div className=" button-filter">
                Short : most recent
            </div>
        </div>
    {/* <!--product main_list--> */}
    <div class="hs-container">
        {/* <!--product side list category--> */}
        <div class="side_category">
            <div>All</div>
            {
                this.state.categories.map((value)=>{
                   return( <div>{value.name}</div>)
                })
            }
        </div>
        {/* <!-- product List--> */}
        {/* <div> */}
                <div class="product_list">
                    {/* <!-- Prodcuct list first row--> */}
                        {/* <!--product details--> */}
                        {this.state.product.map((value)=>{
                            return(
                                <>
                            <div className="hk-product_card">
                                <NavLink to="/productdetails">
                                <div className="img-wraper">
                                    <img src={value.url}/>
                                </div>
                                <div className="description">
                                    {value.title}
                                </div>
                                <div className="price">
                                {value.price}
                                </div>
                                <div className="hk-addcard">
                                    <a href="#">ADD TO CART</a>
                                </div>
                                </NavLink>
                            </div>
                            {/* <div className="row">
                                <div className="col s3">
                                    <Card images={value.url} banner={true} title={value.title} description={value.price}/>
                                </div>
                            </div> */}
                            </>
                            );
                        })
                        }                
                </div>
        {/* </div> */}
        {/* <Pagination/> */}

    </div> 
        </>
        );
    };  
}

export default ProductList;
