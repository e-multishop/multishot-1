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

const columns = [
    {
      id: 'order_id', 
      label: 'Order ID',
      minWidth: 50
    },
    {
      id: 'title',
      label: 'Product Title',
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
      align: 'right',
    }
  ];

export default function OrderList(props) {

    const [loader, setLoader] = useState(true);
    const [orderList, setOrderList] = useState([]);
    const [totalRecords, setTotalRecords] = useState(-1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    useEffect(() => {
        axios.get('/rest/order/list/'+page+'/'+rowsPerPage).then(res => {
            setOrderList(res.data.results);
            setLoader(false);
        });
    }, []);

    const launchEditProductDialog = (a) => {

    };

    const ShowData = (column, value,row, cindex) => {
        return (
            <TableCell key={cindex} align={column.align}>
              <div>{value}</div>
            </TableCell>
        )
    };

    const handleChangePage = () => {

    };

    const handleChangeRowsPerPage = () => {

    }

    return (
        <Paper className="hs-order-wrapper">
          <TableContainer className="hs-order container">
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