import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Loader from 'shared/Loader';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
const columns = [
    {
      id: 'order_id', 
      label: 'Order ID',
      minWidth: 50
    },
    {
      id: 'summary',
      label: 'Product Summary',
      minWidth: 100
    },
    {
      id: 'total_amount',
      label: 'Amount',
      minWidth: 70
    },
    {
      id: 'created_date',
      label: 'Created Date',
      minWidth: 40,
    },
    {
      id: 'uid',
      label: 'User',
      minWidth: 40
    },
    {
      id: 'status',
      label: 'Order status',
      minWidth: 40,
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 40,
      align: 'right'
    }
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
  
export default function OrderList(props) {

    const [loader, setLoader] = useState(true);
    const [orderList, setOrderList] = useState([]);
    const [totalRecords, setTotalRecords] = useState(-1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const classes = useStyles();

    const fetchOrder = (page, rowsPerPage) => {
      axios.get('/rest/order/list/'+page+'/'+rowsPerPage).then(res => {
        setOrderList(res.data.results.list);
        setTotalRecords(res.data.results.totalRecords);
        setLoader(false);
    });
    }
    useEffect(() => {
      fetchOrder(page, rowsPerPage);
    }, []);

    const launchEditProductDialog = (a) => {

    };

    const ShowData = (column, value,row, cindex) => {
      switch (column.id) {
        case 'total_amount':
          return (
            <TableCell key={cindex} align={column.align}>
              <div>&#8377; {value}</div>
            </TableCell>
          );
          case 'created_date':
            const createdDate = new Date(parseInt(value));
            return (
              <TableCell key={cindex} align={column.align}>
                <div>{createdDate.toLocaleDateString()}</div>
              </TableCell>
            )
          case 'status':
            return (
              <TableCell key={cindex}>
                Open
              </TableCell>
            )
          case 'action':
            return (
              <TableCell key={cindex} align="right">
                <Button color="primary" onClick={() => props.showEditDialog()}>Update</Button>
              </TableCell>
            )
          case 'user':
            return (
              <TableCell>
                  {value}
              </TableCell>
            )
          default:
            return (<TableCell key={cindex} align={column.align}>
              <div>{value}</div>
            </TableCell>)
      }
    };

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
    };

    const handleChangePage = (e, page) => {
      setPage(page);
      fetchOrder(page, rowsPerPage);
    };

    const handleChangeRowsPerPage = (e) => {
      const rowsPerPage = e.target.value;
      setRowsPerPage(rowsPerPage);
      fetchOrder(page, rowsPerPage);
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
                {orderList.map((row, index) => {
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
                  orderList.length === 0 ? showEmptyData() : ''
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