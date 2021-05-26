import React,{ Component} from "react";
import "./Style.scss";
import "./App.css";
import Header from './Components/Header/Header.js';
import Footer from './Components/Footer/Footer';
import Home from './Components/Pages/Home/Home';
import {Route,HashRouter,Switch} from 'react-router-dom';
import About from './Components/Pages/About/About';
import Contact from './Components/Pages/Contact/Contact';
import Product from './Components/Pages/Product/Productdetails';
import ProductList from './Components/Pages/productlist/ProductList';
import Search from './Components/Header/Search';
class App extends Component{
  render(){
    return(
      <HashRouter>
        <Header/>
        <Switch>
            <Route exact component={Home} path="/"/>
            <Route component={About} path="/about"/>
            <Route component={ProductList} path="/shop"/>
            <Route component={Product} path="/productdetails"/>
            <Route component={Contact} path="/contact"/>
            <Route component={Search} path="/search"/>
        </Switch>
        <Footer/>
    </HashRouter>
    );
  };
}

export default App;