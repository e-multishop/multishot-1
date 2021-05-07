import React,{Component} from 'react';
import "./ProductList.css";

class ProductList extends Component{
    render(){
        return(
        <>
          {/* <!--product main_list--> */}
    <div class="hs-container">
        {/* <!--product side list category--> */}
        <div class="side_category">
            <div>product category 1</div>
            <div>product category 2</div>
            <div>product category 3</div>
            <div>product category 4</div>
            <div>product category5</div>
            <div>product category 6</div>
            <div>product category 7</div>
        </div>
        {/* <!-- product List--> */}
        <div class="product_list">
            {/* <!-- Prodcuct list first row--> */}
                {/* <!--product details--> */}
                <div class="card">
                    <div class="img-wraper">
                        <img src="./1.jpg"/>
                    </div>
                    <div class="description">
                    product1 description dfasdf asdf adf asdf asdf adf asdf
                    </div>
                    <div class="price">
                        Rs 600.00/
                    </div>
                </div>
                <div class="card">
                    <div class="img-wraper">
                        <img src="./2.jpg"/>
                    </div>
                    <div class="description">
                    product1 description dfasdf asdf adf asdf asdf adf asdf
                    </div>
                    <div class="price">
                        Rs 600.00/
                    </div>
                </div>
                <div class="card">
                    <div class="img-wraper">
                         <img src="./1.jpg"/>
                    </div>
                    <div class="description">
                    product1 description dfasdf asdf adf asdf asdf adf asdf
                    </div>
                    <div class="price">
                        Rs 600.00/
                    </div>
                </div>
                <div class="card">
                    <div class="img-wraper">
                         <img src="./2.jpg"/>
                    </div>
                    <div class="description">
                    product1 description dfasdf asdf adf asdf asdf adf asdf
                    </div>
                    <div class="price">
                     Rs 600.00/
                    </div>
                </div>
                <div class="card">
                    <div class="img-wraper">
                        main image 1
                    </div>
                    <div class="description">
                    product1 description
                    </div>
                    <div class="price">
                        product price
                    </div>
                </div>
                <div class="card">
                    <div class="img-wraper">
                        main image 2
                    </div>
                    <div class="description">
                    product1 description
                    </div>
                    <div class="price">
                        product price
                    </div>
                </div>
                {/* <!--product details--> */}
                <div class="card">
                    <div class="img-wraper">
                        main image 3
                    </div>
                    <div class="description">
                    product1 description
                    </div>
                    <div class="price">
                        product price
                    </div>
                </div>
                <div class="card">
                    <div class="img-wraper">
                        main image 4
                    </div>
                    <div class="description">
                    product1 description
                    </div>
                    <div class="price">
                        product price
                    </div>
                </div>
        </div>
    </div> 
        </>
        );
    };  
}

export default ProductList;
