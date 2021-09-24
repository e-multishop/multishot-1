import React,{ Component} from "react";
import "./Style.scss";
import "./App.scss";
import Header from './Components/Header/Header.js';
import Footer from './Components/Footer/Footer';
import Home from './Components/Pages/Home/Home';
import {Route,HashRouter,Switch} from 'react-router-dom';
import About from './Components/Pages/About/About';
import Contact from './Components/Pages/Contect_submit/Contact_submit';
import ProductList from './Components/Pages/productlist/ProductList';
import Productdetails from './Components/Pages/Product/Productdetails';
import Search from './Components/Header/Search';
import Login from './Components/Pages/login/Login';
import Signup from'./Components/Pages/login/Signup';
import * as materialize  from 'materialize-css/dist/js/materialize';
import 'react-toastify/dist/ReactToastify.css';
import Reset from './Components/Pages/login/Reset_password';
import Checkout from './Components/Pages/product_checkout/Checkout'
import PageNotFound from "./Components/Pages/PageNotFound/PageNotFound";
import Account from "./Components/Pages/User_dashboard/account/Account";
import Forgotpassword from "./Components/Pages/login/Forgotpassword";

class App extends Component{
  render(){
    return(
      <HashRouter>
        {/* <div id="LoginDropdown"></div> */}

          <Switch>
              <Route exact component={Home} path="/"/>
              <Route component={About} path="/about"/>
              <Route component={ProductList} path="/shop"/>
              <Route component={Productdetails} path="/productdetails/:pid"/>
              <Route component={Contact} path="/contact"/>
              <Route component={Account} path="/account"/>
              <Route component={Checkout} path="/viewcart"/>
              <Route component={Login} path="/login"/>
              <Route component={Signup} path="/signup"/>
              <Route component={Forgotpassword} path="/forgotpassword"/>
              <Route exact component={Reset} path="/reset_password/:id"/>
              <Route component={PageNotFound}/>
        </Switch>
    </HashRouter> 
    );
  };
}

export default App;
