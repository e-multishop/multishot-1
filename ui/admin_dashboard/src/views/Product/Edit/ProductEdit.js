import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';
import EditProductForm from './EditProductForm'
import { ToastContainer, toast } from 'react-toastify';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import './ProductEdit.scss';
import ReactDOM from 'react-dom';
import { EventBus } from '../../../common/event-bus';
import { EventType } from '../../../common/events';
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
    }
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

export default function ProductEdit(props) {
    const [open, setOpen] = React.useState(true);


    const handleClose = () => {
        setOpen(false);
        reset();
        ReactDOM.unmountComponentAtNode(document.getElementById('product-dialog'));
    };

    const [editUploadImage, setEditUploadImage] = useState(" ");
    const [editUploadImageChanged, setEditUploadImageChanged] = useState(false);
    const [Editformdata, setEditFormdata] = useState({
        category: props.category,
        title: props.title,
        sku: props.sku,
        price: props.price,
        price_without_embroidary: props.price,
        description: props.description,
        note: props.note,
        material: props.material,
        size: props.size,
        total_available: props.total_quantity,
        total_quantity: props.total_quantity,
        dimension: props.dimension,
        color: props.color,
        image_data: props.image_data,
        imageDataChanged: editUploadImageChanged
    });
    
    function onSubmit(pid) {
        Axios.put("/rest/update", {
            pid: pid,
            category: Editformdata.category,
            title: Editformdata.title,
            price: Editformdata.price,
            price_without_embroidary: Editformdata.price,
            description: Editformdata.description,
            note: Editformdata.note,
            material: Editformdata.material,
            total_available: Editformdata.total_quantity,
            total_quantity: Editformdata.total_quantity,
            available: '1',
            sku: Editformdata.sku,
            status: '1',
            size: Editformdata.size,
            image_data: editUploadImage,
            image_data_changed: editUploadImageChanged
        }
        ).then(res => {
            EventBus.dispatch(EventType.UPDATE_PRODUCT_TABLE);
            toast.success("Product updated successfully");
            handleClose();
        }).catch(err => {
            console.log(err)
            toast.error("Error updating product. Please try again later.")
        });
    }
    function reset() {
        setEditFormdata({
            category: "",
            title: " ",
            sku: " ",
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
            image_data_changed: false
        });
        setEditUploadImage(" ");
    }

    return (
        <div>
            <Dialog fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}
                fullWidth={true}
                maxWidth="sm"
            >
                <DialogTitle id="customized-dialog-title" classes={{root: 'hs-edit-product title'}} onClose={handleClose}>
                    <BorderColorOutlinedIcon fontSize="large" classes={{root: 'hs-edit-product icon'}}/> {props.readonly ? 'View' : 'Edit' } Product
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <EditProductForm
                            Editformdata={Editformdata}
                            setEditFormData={setEditFormdata}
                            setEditUploadImage={setEditUploadImage}
                            setEditUploadImageChanged={setEditUploadImageChanged}
                        />
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button disabled={props.readonly ? true : null} autoFocus onClick={() => { onSubmit(props.pid) }} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
