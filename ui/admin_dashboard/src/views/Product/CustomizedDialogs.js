import React,{useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import "./insertproduct.scss"
import Axios from 'axios';
import Insertproduct from "./Insertproduct.js"
import { ToastContainer, toast } from 'react-toastify';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [formdata, setFormdata] = useState({
    category: "",
    title: " ",
    price: " ",
    price_without_embroidary: " ",
    description: " ",
    note: " ",
    material: " ",
    size: " ",
    total_available: " ",
    total_quantity: " ",
    image: " ",
    dimension: " ",
    color: " ",
  });
  function onSubmit(e) {
    var primarykey = ""

    Axios.post("http://localhost:3002/rest/addproduct", {
      pid: "Hkp53" + 1,
      category: formdata.category,
      title: formdata.title,
      price: formdata.price,
      price_without_embroidary: "89",
      description: formdata.description,
      note: formdata.note,
      material: formdata.material,
      total_available: "89",//89-demo data
      total_quantity: formdata.total_quantity,
    }
    ).then(res => {
      console.log(res.formdata)
      toast.success("Success");
      // setOpen(false);
    

    }).catch(err => {
      console.log(err)
      toast.error("Data did not inserted")
    });
    // document.getElementById("insertproduct").reset();
    // {html: 'I am a toast!'}
  }
  return (
    <div>
      <div className="addproduct-button">
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add New Product
      </Button>
      </div>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add New Product
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <Insertproduct formData={formdata} setFormData={setFormdata} />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={(e) => {onSubmit(e)}} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
