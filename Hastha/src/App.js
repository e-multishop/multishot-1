import React,{ Component} from "react";
import "./Style.scss";
import "./App.css";
import Header from './Components/Header/Header.js';
import Footer from './Components/Footer/Footer';
import Home from './Components/Pages/Home/Home';
import {Route,HashRouter,Switch} from 'react-router-dom';
import About from './Components/Pages/About/About';
import Contact from './Components/Pages/Contect_submit/Contact_submit';
import ProductList from './Components/Pages/productlist/ProductList';
import Productdetails from './Components/Pages/Product/Productdetails';
import Search from './Components/Header/Search';
import * as materialize  from 'materialize-css/dist/js/materialize';
class App extends Component{
  render(){
    return(
      <HashRouter>
        <Header/>
        <div id="search"></div>
        <Switch>
            <Route exact component={Home} path="/"/>
            <Route component={About} path="/about"/>
            <Route component={ProductList} path="/shop"/>
            <Route component={Productdetails} path="/productdetails"/>
            <Route component={Contact} path="/contact"/>
       </Switch>
        <Footer/>
    </HashRouter>
    );
  };
}

export default App;