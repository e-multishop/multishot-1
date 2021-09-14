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
import ProductEdit from '../Edit/ProductEdit'
import Loader from 'shared/Loader';
import ProductUtil from './../../common/util/ProductUtil';
// import EventEmitter from 'fbemitter';
const columns = [
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

export default function StickyHeadTable(props) {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [Action, setAction] = React.useState('');
  const [productData, setProductData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [updateTable,setUpdateTable]=useState(false);
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
  }, []);
  if (props.updateTable == true || updateTable==true) {
    getProductList(page, rowsPerPage);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getProductList(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    getProductList(0, event.target.value);
  };
<<<<<<< Updated upstream
=======
  const [productData, setProductData] = useState([]);
  const [updateTable,setUpdateTable]=useState(false);
  const [loader, showLoader] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
      showLoader(true);
      Axios.get("/rest/product_list/"+pageSize+"/"+pageNumber).then((res) => {
        // console.log(res.data);
        const result = res.data;
        ProductUtil.updateProductData(result);
        setProductData(result);
        showLoader(false);
      })
  }, []);
  if (props.updateTable == true || updateTable==true) {
    Axios.get("/rest/product_list").then((res) => {
      // console.log(res.data);
      const result = res.data;
      ProductUtil.updateProductData(result);
      setProductData(result);
    })
  }
>>>>>>> Stashed changes
  
  const ShowData = (column, value,row) => {
    switch (column.id) {
      case "action":
        return (
          <TableCell key={column.id} align={column.align}>
            <ProductEdit value={row} setUpdateTable={setUpdateTable}/>
          </TableCell>
        );
      default: return (
        <TableCell key={column.id} align={column.align}>
          {column.format && typeof value === 'number' ? column.format(value) : value}
        </TableCell>
      );
    }
  }
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        { loader ? <Loader height="400px" /> : 
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
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
            {productData.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      ShowData(column, value,row)
                    );
                  })}
                </TableRow>
              );
            })}
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
