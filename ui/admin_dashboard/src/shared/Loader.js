import React from "react";
import './Loader.css';

const Loader = (props) => {
    const height = props.height ? props.height : '100px';
    return (
      <div className="hs-loader" style={{'height': props.height}}>
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
      </div>    
      </div>
    )
}

export default Loader;