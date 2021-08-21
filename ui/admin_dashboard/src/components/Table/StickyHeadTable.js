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
// import EventEmitter from 'fbemitter';
const columns = [
  { id: 'title', label: 'Product Title', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 70 },
  {
    id: 'description',
    label: 'Descrtiption',
    minWidth: 150,
    align: 'right',
  },
  {
    id: 'size',
    label: 'Size',
    minWidth: 70,
    align: 'right',
  },
  {
    id: 'total_quantity',
    label: 'Quantity',
    minWidth: 70,
    align: 'right',
  },
  {
    id: 'color',
    label: 'Color',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'dimension',
    label: 'Dimention',
    minWidth: 100,
    align: 'right',
  },
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
];


// function createData(ptitle, price, description, size, quantity, color, dimension, material, note) {
//   // const density = population / size;
//   return { ptitle, price, description, size, quantity, color, dimension, material, note };
// }

// const rows = [
//   createData('Black', 'price', "description", "size", "quantity", "color", "dimension", "material", "note")
// ];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable(props) {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3000/rest/product").then((res) => {
      // console.log(res.data);
      const result = res.data;
      setProductData(result);
    })

  },[]);
  if(props.updateTable==true)
  {
    Axios.get("http://localhost:3000/rest/product").then((res) => {
      // console.log(res.data);
      const result = res.data;
      setProductData(result);
    }) 
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
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
            {productData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={productData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
