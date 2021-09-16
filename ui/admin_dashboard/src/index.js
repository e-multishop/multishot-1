/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { GuardProvider, GuardedRoute } from 'react-router-guards';

// import * as materialize  from 'materialize-css/dist/js/materialize';

// core components
import Admin from "layouts/Admin.js";
// import InsertProduct from "./views/Product/Insertproduct.js";
// import RTL from "layouts/RTL.js";
import * as materialize from 'materialize-css/dist/js/materialize';
import "./Style.scss";
import "assets/css/material-dashboard-react.css?v=1.10.0";
//
// import {createStore} from 'redux';
// import {Provider}from 'react-redux'
// import rootReducers from './redux/service/reducers/index'
// const store=createStore(rootReducers)
// console.warn("store",store)
//

const getIsLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (token != null) {
    return (true)
    // setEmail(email)
  }
  else {
    return false;
  }
}

const isAdmin = () => {
  const userType = localStorage.getItem('userType');
  return userType && userType === '1';
}

const requireLogin = (to, from, next) => {
  if (to.meta.auth) {
    if (getIsLoggedIn()) {
      if (isAdmin()) {
        next();
      } else {
        document.location.href = "/#/page-not-found?redirect_path=admin";
      }
    }
    else {
      document.location.href = "/#/login?redirect_path=admin";
    }
    // next.redirect('/login');
  } else {
    next();
  }
};

ReactDOM.render(
  <BrowserRouter>
    <GuardProvider guards={[requireLogin]} >
      <Switch>
        {/* <Route path="/addproduct" component={InsertProduct} /> */}
        <GuardedRoute path="/admin" component={Admin} meta={{ auth: true }} />
        {/* <Route path="/rtl" component={RTL} /> */}
        <Redirect from="/" to="/admin/table" />
      </Switch>
    </GuardProvider>
  </BrowserRouter>,
  // <Provider store={store}>
  //   <Check/>
  // </Provider>,
  document.getElementById("root")
);
