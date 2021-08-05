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
// import * as materialize  from 'materialize-css/dist/js/materialize';

// core components
import Admin from "layouts/Admin.js";
import Check from 'practice/Check'
// import InsertProduct from "./views/Product/Insertproduct.js";
// import RTL from "layouts/RTL.js";
import * as materialize  from 'materialize-css/dist/js/materialize';
import "./Style.scss";
import "assets/css/material-dashboard-react.css?v=1.10.0";
//
// import {createStore} from 'redux';
// import {Provider}from 'react-redux'
// import rootReducers from './redux/service/reducers/index'
// const store=createStore(rootReducers)
// console.warn("store",store)
//
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* <Route path="/addproduct" component={InsertProduct} /> */}
      <Route path="/admin" component={Admin} />
      {/* <Route path="/rtl" component={RTL} /> */}
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>,
  // <Provider store={store}>
  //   <Check/>
  // </Provider>,
  document.getElementById("root")
);
