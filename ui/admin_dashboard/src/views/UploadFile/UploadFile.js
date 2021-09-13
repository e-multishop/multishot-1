import React, { Component } from 'react';
import { DropzoneArea } from 'material-ui-dropzone'
import "./uploadfile.scss";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Axios from 'axios';

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
    
    save() {
      const fileReader = new FileReader();
      if (fileReader.readAsBinaryString) {
        fileReader.onload = (e) => {
          var data = "";
          var bytes = new Uint8Array(e.target.result);
          for (var i = 0; i < bytes.byteLength; i++) {
              data += String.fromCharCode(bytes[i]);
          }
          Axios.post('/rest/addproductbulk', {
            data: data
          }).then((req, res) => {
            res.send('Success');
          });
        }
        fileReader.readAsArrayBuffer(this.state.files[0]);
      }
    }

    render() {
        return (
            <>
                <h1 className="heading-upload">Upload Bulk Product</h1>
                <DropzoneArea

                  onChange={this.handleChange.bind(this)}
                  acceptedFiles={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                  maxFileSize={30000000}
                  filesLimit={3}
                  clearOnUnmount={true}
                />
                <div className="submit-btn">
                    <Button onClick={() => this.save()} color="primary">Submit</Button>
                </div>
            </>

        )
    }
}

export default UploadFile;