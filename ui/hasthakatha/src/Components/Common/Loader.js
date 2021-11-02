import React from "react";
import './Loader.css';

const Loader = (props) => {
    const height = props.height ? props.height : '100px';
    return (
      <div className="hs-loader" style={{'height': height, position: props.inline ? 'static' : 'relative'}}>
        <div class="preloader-wrapper small active">
          <div class="spinner-layer loader-color">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
      </div>    
      </div>
    )
}

export default Loader;