import React from "react";
import './Loader.css';

const Loader = (props) => {
    const height = props.height ? props.height : '100px';
    return (
      <div className="hs-loader" style={{'height': props.height, position: props.inline ? 'static' : 'absolute'}}>
        <div class="preloader-wrapper small active">
          <div class="spinner-layer spinner-green-only">
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