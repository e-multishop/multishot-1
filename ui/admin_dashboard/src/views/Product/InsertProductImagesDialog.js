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
import { toast } from 'react-toastify';
import PostAddTwoToneIcon from '@material-ui/icons/PostAddTwoTone';
import ReactDOM from 'react-dom';
import { EventBus } from '../../common/event-bus';
import { EventType } from '../../common/events';
import { Fab } from '@material-ui/core';
import './InsertProductImagesDialog.scss';
import ProductUtil from 'common/util/ProductUtil';
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

export default function InsertProductImagesDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [valid, setValid] = useState(false);

  const handleClose = () => {
    setOpen(false);
    reset();
    ReactDOM.unmountComponentAtNode(document.getElementById('product-dialog'));
  };

  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');

  function onSubmit() {
    Axios.post("/rest/addproductimage/"+props.pid, {
      image1,
      image2,
      image3,
      image4,
      image5
    }).then(res => {
      EventBus.dispatch(EventType.UPDATE_PRODUCT_TABLE);
      toast.success("Product images uploaded successfully.");
      handleClose();
    }).catch(err => {
      console.log(err)
      toast.error("Error uploading product images. Try again later.")
    });
  }

  function reset(){
  
  }

  const handleImageUpload = (ev, imageCount) => {
    switch (imageCount) {
      case 1:
        ProductUtil.uploadImage(ev, setImage1);
        break;
      case 2:
        ProductUtil.uploadImage(ev, setImage2);
        break;
      case 3:
        ProductUtil.uploadImage(ev, setImage3);
        break;
      case 4:
        ProductUtil.uploadImage(ev, setImage4);
        break;
      case 5:
        ProductUtil.uploadImage(ev, setImage5);
        break;
    }
    setTimeout(() => {updateFormValidity()},500);
  }

  const updateFormValidity = () => {
    if (image1 || image2 || image3 || image4 || image5) {
      setValid(true);
    } else {
      setValid(false);
    }
  }

  return (
    <div>
      <Dialog fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} classes={{root: 'hs-add-product title'}}>
          <PostAddTwoToneIcon fontSize="large" classes={{root: 'hs-add-product icon'}}/> Add product images
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <div className="hs-image-upload-wrapper">
              <div>
                <label htmlFor="product-images-upload-1">
                    <Fab component="span" className="hs-button">
                    <span class="material-icons">
                      insert_photo
                    </span>
                    </Fab>
                  </label>
                <label htmlFor="product-images-upload-1"> Select image 1 </label>
                <input
                  accept="image/*"
                  className="hs-product-image-uploader"
                  id="product-images-upload-1"
                  type="file"
                  onChange={(e) => handleImageUpload(e,1)}
                />
              </div>
              <div>
                <label htmlFor="product-image-upload-2">
                  <Fab component="span" className="hs-button">
                  <span class="material-icons">
                    insert_photo
                  </span>
                  </Fab>
                </label>
                <label htmlFor="product-images-upload-2"> Select image 2 </label>
                <input
                  accept="image/*"
                  className="hs-product-image-uploader"
                  id="product-images-upload-2"
                  type="file"
                  onChange={(e) => handleImageUpload(e, 2)}
                />
              </div>
              <div> 
                <label htmlFor="product-images-upload-3">
                  <Fab component="span" className="hs-button">
                  <span class="material-icons">
                    insert_photo
                  </span>
                  </Fab>
                </label>
                <label htmlFor="product-images-upload-3"> Select image 3 </label>
                <input
                  accept="image/*"
                  className="hs-product-image-uploader"
                  id="product-images-upload-3"
                  type="file"
                  onChange={e => handleImageUpload(e, 3)}
                />
              </div>
              <div>
                <label htmlFor="product-image-upload-4">
                  <Fab component="span" className="hs-button">
                  <span class="material-icons">
                    insert_photo
                  </span>
                  </Fab>
                </label>
                <label htmlFor="product-images-upload-4"> Select image 4 </label>
                <input
                  accept="image/*"
                  className="hs-product-image-uploader"
                  id="product-images-upload-4"
                  type="file"
                  onChange={e => handleImageUpload(e, 4)}
                />
              </div>
              <div>
                <label htmlFor="product-images-upload-5">
                  <Fab component="span" className="hs-button">
                  <span class="material-icons">
                    insert_photo
                  </span>
                  </Fab>
                </label>
                <label htmlFor="product-images-upload-5"> Select image 5 </label>
                <input
                  accept="image/*"
                  className="hs-product-image-uploader"
                  id="product-images-upload-5"
                  type="file"
                  onChange={e => handleImageUpload(e, 5)}
                />
              </div>
            </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button disabled={valid ? null : true} autoFocus onClick={() => {onSubmit()}} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
