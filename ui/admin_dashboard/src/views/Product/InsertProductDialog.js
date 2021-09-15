import React,{useEffect, useState} from 'react';
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
import Insertproduct from "./Insertproduct.js";
import { ToastContainer, toast } from 'react-toastify';
import PostAddTwoToneIcon from '@material-ui/icons/PostAddTwoTone';
import ReactDOM from 'react-dom';
import { EventBus } from '../../common/event-bus';
import { EventType } from '../../common/events';
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

export default function InsertProductDialog(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    reset();
    ReactDOM.unmountComponentAtNode(document.getElementById('product-dialog'));
  };

  const [formdata, setFormdata] = useState({
    category: "",
    title: " ",
    sku:" ",
    price: " ",
    price_without_embroidary: " ",
    description: " ",
    note: " ",
    material: " ",
    size: " ",
    total_available: " ",
    total_quantity: " ",
    dimension: " ",
    color: " ",
    valid: false
  });
  const [uploadImage,setUploadImage]=useState("");
  const [formPid,setFormPid]=useState(" ");

  useEffect(()=>{
      Axios.get("/rest/get_pid").then(res=>{
        setFormPid(res.data.pid);  
      })
  },[]);

  function onSubmit() {
    Axios.post("/rest/addproduct", {
      pid: formPid,
      category: formdata.category,
      title: formdata.title,
      price: formdata.price,
      price_without_embroidary: formdata.price,
      description: formdata.description,
      note: formdata.note,
      size: formdata.size ? formdata.size : [],
      material: formdata.material,
      total_available: formdata.total_quantity,
      total_quantity: formdata.total_quantity,
      available:'1',
      sku:formdata.sku,
      status:'1',
      url:uploadImage
    }
    ).then(res => {
      EventBus.dispatch(EventType.UPDATE_PRODUCT_TABLE);
      toast.success("New product added successfully.");
      handleClose();
    }).catch(err => {
      console.log(err)
      toast.error("Error adding product. Please try again later.")
    });
  }

  function reset(){
    setFormdata({
      category: "",
      title: " ",
      sku:" ",
      price: " ",
      price_without_embroidary: " ",
      description: " ",
      note: " ",
      material: " ",
      size:[],
      total_available: " ",
      total_quantity: " ",
      dimension: " ",
      color: " ",
    });
    setUploadImage(" ");
    Axios.get("/rest/get_pid").then(res=>{
      setFormPid(res.data.pid);  
    })
  }

  const setFormValidity = (isValid) => {
    formdata.valid = isValid;
  }

  return (
    <div>
      <Dialog fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} classes={{root: 'hs-add-product title'}}>
          <PostAddTwoToneIcon fontSize="large" classes={{root: 'hs-add-product icon'}}/> Add New Product
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <Insertproduct 
              formData={formdata}
              setFormData={setFormdata}
              setUploadImage={setUploadImage}
              setFormValidity={setFormValidity}
              />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button disabled={formdata.valid ? null : true} autoFocus onClick={() => {onSubmit()}} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
