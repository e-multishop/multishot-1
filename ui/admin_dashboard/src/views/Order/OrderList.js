import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Icon from "@material-ui/core/Icon";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Loader from 'shared/Loader';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import './OrderList.scss';
const columns = [
    {
      id: 'order_id', 
      label: 'Order ID',
      minWidth: 50
    },
    {
      id: 'product_summary',
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
      id: 'delivery_status',
      label: 'Order|Delivery status',
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

    const [loader, setLoader] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [totalRecords, setTotalRecords] = useState(-1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const classes = useStyles();

    const fetchOrder = (page, rowsPerPage) => {
      setLoader(true);
      axios.get('/rest/order/list/'+(page+1)+'/'+rowsPerPage).then(res => {
        setOrderList(res.data.results.list);
        setTotalRecords(res.data.results.totalRecords);
        setLoader(false);
      });
    }
    useEffect(() => {
      fetchOrder(page, rowsPerPage);
    }, [props.updateOrderList]);

    const launchEditProductDialog = (a) => {

    };

    const getDeliveryStatus = (value) => {

    }

    const ShowData = (column, value,row, cindex) => {
      switch (column.id) {
        case 'product_summary':
          if (value) {
            const productSummaryDecoded = atob(value);
            const productSummaryList = JSON.parse(productSummaryDecoded);
            return (
              <TableCell key={cindex} align={column.align}>
              {
                productSummaryList.map((l,i) => {
                  return (<div className="hs-product-summary-title">
                      <span className="material-icons hs-product-item">
                        sell
                      </span>
                      <span className="hs-clickable" onClick={() => props.showProductDialog(l.pid)}> {l.title}</span></div>)
                })
              }
              </TableCell>
            )
          };
          
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
          case 'delivery_status':
            switch (value) {
              case 1:
                return (
                  <TableCell key={cindex}>
                    <span class="new badge light-blue" data-badge-caption="">Pending</span>
                  </TableCell>
                )
              case 2:
                return (
                  <TableCell key={cindex}>
                    <span class="new badge green" data-badge-caption="">Completed</span>
                    <span class="new badge light-blue" data-badge-caption="">In Progress</span>
                  </TableCell>
                )
              case 3:
                return (
                  <TableCell>
                    <span class="new badge green" data-badge-caption="">Completed</span>
                  </TableCell>
                )
              case -1:
                return (
                  <TableCell>
                    Cancelled
                  </TableCell>
                )
              default: 
                  return (
                    <TableCell>
                      <span class="new badge red" data-badge-caption="">Error</span>
                  </TableCell>
                  )
            }
            
          case 'action':
            return (
              <TableCell key={cindex} align="right">
                <Button color="primary" onClick={() => props.showEditDialog(row)}>Update</Button>
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