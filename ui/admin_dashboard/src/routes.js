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
// @material-ui/icons
// import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// core components/views for Admin layout
// import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import UploadFile from "views/UploadFile/UploadFile"
import ProductListWrapper from "views/Product/ProductListWrapper";
import OrderListWrapper from "views/Order/OrderListWrapper";
import DashboardPage from "views/Dashboard/DashboardPage";
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "",
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Products",
    icon: "content_paste",
    component: ProductListWrapper,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "shopping_basket",
    component: OrderListWrapper,
    layout: "/admin",
  },
  {
    path: "/uploadfile",
    name: "Upload Bulk Products",
    icon: LibraryBooks,
    component: UploadFile,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  // {
  //   path: "/check",
  //   name: "Check",
  //   icon: Person,
  //   component: Check,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
