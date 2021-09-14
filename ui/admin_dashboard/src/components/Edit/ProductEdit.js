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
    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
        setOpen(false);
        reset();

    };

    const [Editformdata, setEditFormdata] = useState({
        category: " ",
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
    });
    const [editUploadImage, setEditUploadImage] = useState(" ");
     const handleClickOpen = (value) => {
            setEditFormdata({
                category:value.category,
                title:value.title,
                sku:value.sku,
                price:value.price,
                price_without_embroidary:value.price_without_embroidary,
                description:value.description,
                note:value.note,
                material:value.material,
                size:value.size,
                total_available:value.available,
                total_quantity:value.total_quantity,
                dimension:value.dimension,
                color:value.color,
            });
        setOpen(true);
    };
    function onSubmit(pid) {
        console.log("submit pid check=",pid);
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
        }
        ).then(res => {
            // console.log(res.formdata)
            props.setUpdateTable(true);
            toast("Success");
            setOpen(false);
            reset();
        }).catch(err => {
            console.log(err)
            toast("Data did not updated")
        });

        // document.getElementById("insertproduct").reset();
        // {html: 'I am a toast!'}
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
        });
        setEditUploadImage(" ");
    }

    return (
        <div>
            <div className="addproduct-button">
                <Button color="primary" onClick={() => { handleClickOpen(props.value) }} >
                    Edit
                 </Button>
            </div>

            <Dialog fullscreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}
                fullWidth={true}
                maxWidth="sm"
            >
                <DialogTitle id="customized-dialog-title" classes={{root: 'hs-edit-product title'}} onClose={handleClose}>
                    <BorderColorOutlinedIcon fontSize="large" classes={{root: 'hs-edit-product icon'}}/> Edit Product
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <EditProductForm
                            Editformdata={Editformdata}
                            setEditFormData={setEditFormdata}
                            setEditUploadImage={setEditUploadImage}
                        />
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => { onSubmit(props.value.pid) }} color="primary">
                        Submit
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
