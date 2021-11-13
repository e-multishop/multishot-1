import React,{ Component, Suspense} from "react";
import "./Style.scss";
import "./App.scss";
import Home from './Components/Pages/Home/Home';
import {Route,HashRouter,Switch} from 'react-router-dom';

import ProductList from './Components/Pages/productlist/ProductList';

// import Search from './Components/Header/Search';

import * as materialize  from 'materialize-css/dist/js/materialize';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from "./Components/Pages/PageNotFound/PageNotFound";
import Loader from "./Components/Common/Loader";
const AboutUsPage = React.lazy(() => import('./Components/Pages/About/About'));
const OrderPage = React.lazy(() => import("./Components/Pages/User_dashboard/order/Order"));
const OrderdetailsPage = React.lazy(() => import("./Components/Pages/User_dashboard/order/Orderdetails"));
const AccountPage = React.lazy(() => import("./Components/Pages/User_dashboard/account/Account"));
const CheckoutPage = React.lazy(() => import('./Components/Pages/product_checkout/Checkout'));
const ResetPage = React.lazy(() => import('./Components/Pages/login/Reset_password'));
const UserProfilePage = React.lazy(() => import("./Components/Pages/User_dashboard/profile/UserProfile"));
const Add_addressPage = React.lazy(() => import('./Components/Pages/User_dashboard/address/Add_address'));
const ForgotpasswordPage = React.lazy(() => import("./Components/Pages/login/Forgotpassword"));
const LoginPage = React.lazy(() => import('./Components/Pages/login/Login'));
const SignupPage = React.lazy(() => import('./Components/Pages/login/Signup'));
const ProductdetailsPage = React.lazy(() => import('./Components/Pages/Product/Productdetails'));
const ContactPage = React.lazy(() => import('./Components/Pages/Contect_submit/Contact_submit'));
class App extends Component{
  render(){
    return(
      <HashRouter>
        {/* <div id="LoginDropdown"></div> */}
        <Suspense fallback={Loader}>
          <Switch>
              <Route exact component={Home} path="/"/>
              <Route component={ProductList} path="/shop"/>
             
                <Route component={AboutUsPage} path="/about"/>
                <Route component={ContactPage} path="/contact"/>
                <Route component={ProductdetailsPage} path="/productdetails/:pid"/>
                <Route component={OrderdetailsPage} path="/orderdetails/:order_id"/>
                <Route component={AccountPage} path="/account"/>
                <Route component={CheckoutPage} path="/viewcart"/>
                <Route component={LoginPage} path="/login"/>
                <Route component={SignupPage} path="/signup"/>
                <Route component={ForgotpasswordPage} path="/forgotpassword"/>
                <Route exact component={ResetPage} path="/reset_password/:id"/>
                <Route component={UserProfilePage} path="/userprofile/:id"/>
                <Route component={Add_addressPage} path="/addaddress"/>
                <Route component={PageNotFound}/>
        </Switch>
      </Suspense>
    </HashRouter> 
    );
  };
}

export default App;
