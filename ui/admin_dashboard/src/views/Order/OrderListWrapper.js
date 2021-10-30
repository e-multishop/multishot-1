import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import OrderList from "./OrderList";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// import ProductEdit from "./Edit/ProductEdit";
import ReactDOM from 'react-dom';
import { AddDelivery } from "views/Delivery/AddDelivery";
import ProductEdit from "views/Product/Edit/ProductEdit";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "shared/Loader";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function OrderListWrapper() {
  const [updateTable,setUpdateTable]=useState(false);
  const [loader, showLoader] = useState(false);
  const classes = useStyles();

  // const showInsertDialog = () => {
  //   ReactDOM.render(<InsertProductDialog setUpdateTable={setUpdateTable}/>, document.getElementById('product-dialog'));
  // };

  const showEditDialog = (orderData) => {
    ReactDOM.render(<AddDelivery {...orderData} />, document.getElementById('order-dialog'));
  }

  const showProductDialog = (pid) => {
    if (pid) {
      showLoader(true);
      axios.get('/rest/productdetails/'+pid).then(response => {
        showLoader(false);
        ReactDOM.render(<ProductEdit {...response.data.output} readonly/>, document.getElementById('product-dialog'));
      }).catch(error => {
        showLoader(false);
        toast.error('Error getting product. Please try again later')
      });
    }
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Order List</h4>
            </CardHeader>
            <CardBody>
              <OrderList showEditDialog={showEditDialog} showProductDialog={showProductDialog}/>
              <div id="order-dialog"></div>
              <div id="product-dialog"></div>
              { loader ? <Loader height="400px" /> : ''}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
