import { Button, ListItemText, ListItem, Popover } from "@material-ui/core";
import React, { useState } from "react";

const ProductAction = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const setPopover = (e, open) => { 
        setIsOpen(open);
        setAnchorEl(e.currentTarget);
    }

    const handleClose = (e) => {
        setIsOpen(false);
    }

    return (
            <div className="editproduct-button">
              <Button onClick={(e) => setPopover(e, !isOpen)}>
                <span className="material-icons">
                  more_vert
                </span>
              </Button>
              <Popover
                id={'product-action-'+props.cindex}
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}>
                  <ul>
                    <li >
                    <ListItem button onClick={() => { props.launchEditProductDialog(props.row)}}>
                        <ListItemText primary="Edit" />
                    </ListItem>
                    </li>
                    <li>
                        <ListItem button onClick={() => { props.launchAddProductImageDialog(props.row)}}>
                          <ListItemText primary="Upload images" />
                      </ListItem>
                    </li>
                    <li>
                        <ListItem button onClick={() => { props.deleteImage(props.row.pid)}}>
                          <ListItemText primary="Delete" />
                      </ListItem>
                    </li>
                  </ul>
              </Popover>
            </div>
    );
};

export default ProductAction;