import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddDelivery.scss';

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

export function AddDelivery(props) {
    const [open, setOpen] = useState(true);
    let propsDeliveryDate = props.delivery_date;
    if (propsDeliveryDate) {
        const parsedDate = parseInt(props.delivery_date);
        const parsedActualDate = new Date(parsedDate);
        propsDeliveryDate = parsedActualDate.toISOString().substr(0,10);
    }
    const [deliveryDate, setDeliveryDate] = useState(propsDeliveryDate);
    const [trackingNumber, setTrackingNumber] = useState(props.tracking_number);
    const [deliveryType, setDeliveryType] = useState(props.delivery_type);
    const [deliveredDate, setDeliveredDate] = useState(props.delivered_date);
    const [deliveredNote, setDeliveredNote] = useState(props.delivered_note);

    const disableTrackingForm = props.delivery_status === 3 ? true : null;
    const disbleDeliveryForm = props.delivery_status === 2 ? null : true;

    const handleClose = () => { 
        setOpen(false);
        ReactDOM.unmountComponentAtNode(document.getElementById('order-dialog'));
    }

    function updateFormElements() {
        const insertproduct = document.getElementById("hs-delivery-form");
        const elems = insertproduct ? insertproduct.querySelectorAll('select') : '';
        const options = {};
        var instances = M.FormSelect.init(elems, options);
    }
    useEffect(() => {
        setTimeout(() => {
            updateFormElements();
        }, 1000);
    });
    const onSubmitTracking = () => {
        axios.post('/rest/tracking/'+props.order_id, {
            deliveryDate,
            trackingNumber
        }).then(res => {
            toast.success('Tracking information added');
            handleClose();
        }).catch(err => {
            toast.error('Error updating delivery info, try again later');
        })
    };
    const onSubmitDelivery = () => {
        axios.post('/rest/delivery/'+props.order_id, {
            deliveredDate,
            deliveredNote
        }).then(res => {
            toast.success('Delivery information added');
            handleClose();
        }).catch(err => {
            toast.error('Error updating delivery info, try again later');
        })
    };
    const onSubmit = () => {
        if (props.delivery_status === 1) {
            onSubmitTracking();
        } else {
            if (deliveredDate) {
                onSubmitDelivery();
            } else {
                onSubmitTracking();
            }
        }
    };
    const updateTrackingNumber = (e) => {
        setTrackingNumber(e.target.value);
    }
    const updateDispatchedDate = (e) => {
        setDeliveryDate(e.target.valueAsNumber);
    }
    const updateDeliveryType = (e) => {
        setDeliveryType(e.target.value);
    }
    const updateDeliveredDate = (e) => {
        setDeliveredDate(e.target.value);
    }
    return (
        <div>
            <Dialog fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}
                fullWidth={true}
                maxWidth="sm"
            >
                <DialogTitle id="customized-dialog-title" classes={{root: 'hs-edit-product title'}} onClose={handleClose}>
                    <BorderColorOutlinedIcon fontSize="large" classes={{root: 'hs-edit-product icon'}}/> Update Delivery
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <div id="hs-delivery-form">
                            <fieldset disabled={disableTrackingForm}>
                                <legend>Tracking Information</legend>
                                <div className="input-field">
                                    <select value={deliveryType} onChange={updateDeliveryType}>
                                        <option value="0">Free</option>
                                        <option value="1">Express</option>
                                    </select>
                                    <label>Delivery Type<span className="star_color">*</span></label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="tracking_number" id="tracking_number" 
                                        value={trackingNumber}
                                        onChange={(e) => updateTrackingNumber(e)}/>
                                    <label className="" htmlFor="tracking_number">Tracking Number</label>
                                </div>
                                <div className="input-field">
                                    <input type="date" name="dispatched_date" id="dispatched_date" 
                                        value={deliveryDate}
                                        onChange={(e) => updateDispatchedDate(e)}/>
                                    <label className="" htmlFor="dispatched_date">Dispatch Date</label>
                                </div>
                            </fieldset>
                            <fieldset disabled={disbleDeliveryForm}>
                                <legend>Delivery Information</legend>
                                <div className="input-field">
                                    <input type="date" name="delivered_date" id="delivered_date" 
                                        value={deliveredDate}
                                        onChange={(e) => updateDeliveredDate(e)}/>
                                    <label className="" htmlFor="delivered_date">Delivered Date</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="delivered_note" id="delivered_note" 
                                        value={deliveredNote}
                                        onChange={(e) => setDeliveredNote(e.target.value)}
                                        />
                                    <label htmlFor="delivered_note">Delivered Note (Optional)</label>
                                </div>
                            </fieldset>
                        </div>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button disabled={props.delivery_status === 3 ? true : null} autoFocus onClick={() => { onSubmit(props.pid) }} color="primary">
                        Update
                     </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}