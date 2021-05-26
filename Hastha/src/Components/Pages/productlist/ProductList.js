import React,{Component} from 'react';
import "./ProductList.css";

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
          {/* <!--product main_list--> */}
    <div class="hs-container">
        {/* <!--product side list category--> */}
        <div class="side_category">
            {
                this.state.categories.map((value)=>{
                   return( <div>{value.name}</div>)
                })
            }
        </div>
        {/* <!-- product List--> */}
        <div class="product_list">
            {/* <!-- Prodcuct list first row--> */}
                {/* <!--product details--> */}
                {this.state.product.map((value)=>{
                    return(
                    <div class="card">
                        <div class="img-wraper">
                            <img src={value.url}/>
                        </div>
                        <div class="description">
                            {value.title}
                        </div>
                        <div class="price">
                           {value.price}
                        </div>
                    </div>
                    );
                })
                }                
        </div>
    </div> 
        </>
        );
    };  
}

export default ProductList;
