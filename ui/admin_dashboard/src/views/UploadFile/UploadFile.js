import React, { Component } from 'react';
import { DropzoneArea } from 'material-ui-dropzone'
import "./uploadfile.scss";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import ProgressBar from 'shared/ProgressBar';
import { toast } from 'react-toastify';

class UploadFile extends Component {
    constructor(props){
        super(props);
        this.state = {
          files: [],
          uploading: false
        };
      }

    handleChange(files){
      this.setState({
        files: files
      });
    }
    
    save() {
      const fileReader = new FileReader();
      if (fileReader.readAsBinaryString) {
        var _this = this;
        fileReader.onload = (e) => {
          const data = btoa(e.target.result);
          _this.setState({
            uploading: true
          });
          Axios.post('/rest/addproductbulk', {
            data: data
          }).then((req, res) => {
            _this.setState({
              uploading: false
            });
            toast.success('Products uploaded successfully');
          }).catch(e => {
            _this.setState({uploading: false});
            toast.error('Error adding products, please try again later.')
          });
        }
        fileReader.readAsBinaryString(this.state.files[0]);
      }
    }

    render() {
        return (
            <>
                <h1 className="heading-upload">Upload Bulk Product</h1>
                {
                  this.state.uploading 
                  ? <ProgressBar /> 
                  : <>
                    <DropzoneArea
                      onChange={this.handleChange.bind(this)}
                      acceptedFiles={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                      maxFileSize={30000000}
                      filesLimit={1}
                      clearOnUnmount={true}
                    />
                    <div className="submit-btn">
                        <Button disabled={this.state.files && this.state.files.length > 0 ? null : true} onClick={() => this.save()} color="primary">Submit</Button>
                    </div>
                    </>
                }
            </>

        )
    }
}

export default UploadFile;