import React, { Component } from 'react';
import { DropzoneArea } from 'material-ui-dropzone'
import "./uploadfile.scss";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class UploadFile extends Component {
    constructor(props){
        super(props);
        this.state = {
          files: []
        };
      }
      handleChange(files){
        this.setState({
          files: files
        });
      }
    render() {
        return (
            <>
                <h1 className="heading-upload">Upload Bulk Product</h1>
                <DropzoneArea
                          onChange={this.handleChange.bind(this)}
                          acceptedFiles={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}

  
                />
                <div className="submit-btn">
                    <Button color="primary">Submit</Button>
                </div>
            </>

        )
    }
}

export default UploadFile;