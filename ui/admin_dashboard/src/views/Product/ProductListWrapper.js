import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import ProductList from "./ProductList";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import InsertProductDialog from "views/Product/InsertProductDialog.js";
import ProductEdit from "./Edit/ProductEdit";
import { Button } from "@material-ui/core";
import ReactDOM from 'react-dom';
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

export default function ProductListWrapper() {
  const [updateTable,setUpdateTable]=useState(false);
  const classes = useStyles();

  const showInsertDialog = () => {
    ReactDOM.render(<InsertProductDialog setUpdateTable={setUpdateTable}/>, document.getElementById('product-dialog'));
  };

  const showEditDialog = (dialogData) => {
    ReactDOM.render(<ProductEdit {...dialogData} />, document.getElementById('product-dialog'));
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
      <div className="addproduct-button">
        <Button variant="outlined" color="primary" onClick={showInsertDialog}>
          Add New Product
        </Button>
        <div id="product-dialog"></div>
      </div>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Product List</h4>
          </CardHeader>
          <CardBody>
            <ProductList updateTable={updateTable} showEditDialog={showEditDialog} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
