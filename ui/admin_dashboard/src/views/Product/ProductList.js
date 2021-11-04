import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Axios from 'axios';
import { ContactSupportOutlined } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import ProductEdit from './Edit/ProductEdit'
import Loader from 'shared/Loader';
import ProductUtil from '../../common/util/ProductUtil';
import { EventBus } from '../../common/event-bus';
import { EventType } from '../../common/events';
import { Button, Popover } from '@material-ui/core';
import { toast } from 'react-toastify';
import ProductAction from './ProductAction';
import axios from 'axios';

const columns = [
  {
    id: 'image_data', 
    label: 'Image',
    minWidth: 50
  },
  {
    id: 'title',
    label: 'Product Title',
    minWidth: 100
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 70
  },
  {
    id: 'sku',
    label: 'SKU',
    minWidth: 40,
    align: 'right',
  },
  // {
  //   id: 'image_data',
  //   label: 'Product Images',
  //   minWidth: 40,
  //   align: 'right',
  // },
  // {
  //   id: 'description',
  //   label: 'Descrtiption',
  //   minWidth: 100,
  //   align: 'right',
  // },
  // {
  //   id: 'size',
  //   label: 'Size',
  //   minWidth: 50,
  //   align: 'right',
  // },
  {
    id: 'total_quantity',
    label: 'Quantity',
    minWidth: 50,
    align: 'right',
  },
  // {
  //   id: 'color',
  //   label: 'Color',
  //   minWidth: 100,
  //   align: 'right',
  // },
  // {
  //   id: 'dimension',
  //   label: 'Dimention',
  //   minWidth: 100,
  //   align: 'right',
  // },
  {
    id: 'material',
    label: 'Material',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'note',
    label: 'Care Instructions',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'action',
    label: 'Actions',
    minWidth: 100,
    align: 'right',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    minHeight: 400,
    maxHeight: 440,
  },
});

export default function ProductList(props) {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productData, setProductData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loader, showLoader] = useState(true);

  const getProductList = (page, rowsPerPage) => {
    showLoader(true);
    Axios.get("/rest/product_list/"+rowsPerPage+"/"+(page + 1)).then((res) => {
      const result = res.data;
      ProductUtil.updateProductData(result.list);
      setProductData(result.list);
      setTotalRecords(result.totalRecords);
      showLoader(false);
    })
  }

  useEffect(() => {
    getProductList(page, rowsPerPage);
    EventBus.subscribe(EventType.UPDATE_PRODUCT_TABLE, getProducts);
    return function cleanup() {
      EventBus.unsubscribe(EventType.UPDATE_PRODUCT_TABLE);
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getProductList(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    getProductList(0, event.target.value);
  };

  const launchEditProductDialog = (productValue) => {
    props.showEditDialog(productValue);
  }

  const launchAddProductImageDialog = (productValue) => {
    props.showAddProductImageDialog(productValue);
  }

  const deleteImage = (pid) => {
    if (confirm('Are you sure you want to delete')) {
      axios.delete('/rest/product/'+pid).then(res => {
        getProducts();
        toast.success(res.data.message);
      }).catch(err => {
        toast.error('Error deleting image, please try again later');
      })
    };
  }

  const getProducts = () => {
    getProductList(page, rowsPerPage);
  }
  
  const ShowData = (column, value,row, cindex) => {
    switch (column.id) {
      case "action":
        let isPopOverOpen = false;
        return (
          <TableCell key={cindex} align={column.align}>
            <ProductAction row={row} cindex={cindex} 
              launchEditProductDialog={launchEditProductDialog} 
              launchAddProductImageDialog={launchAddProductImageDialog}
              deleteImage={deleteImage}
            />
          </TableCell>
        );
      case "image_data":
        return (
          <TableCell key={cindex} align={column.align}>
            { row ? <img src={value} className="hs-product-thumbnail" width="50"/> : '' }   
          </TableCell>
        )
      default: return (
        <TableCell key={column.id} align={column.align}>
          {column.format && typeof value === 'number' ? column.format(value) : value}
        </TableCell>
      );
    }
  }

  const showEmptyData = () => {
    return (
      <tr>
        <td colspan="7">
          <div className="hs-no-products">
            <p>No products found. Please add a product.</p>
          </div>
        </td>
      </tr>
    )
  }
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        { loader ? <Loader height="400px" /> : 
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column, cindex) => {
                    const value = row[column.id];
                    return (
                      ShowData(column, value,row, cindex)
                    );
                  })}
                </TableRow>
              );
            })}
            {
              productData.length === 0 ? showEmptyData() : ''
            }
          </TableBody>
        </Table>
      }
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalRecords}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
