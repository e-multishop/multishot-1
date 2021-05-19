import React from 'react';
import "./Footer.css";

const Footer =()=>{
    return(
        <footer className="page-footer hk-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="text-color">Hasthakatha</h5>
                <p className=" text-lighten-4 text-color">email-hasthakatha@gmail.com</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="text-color">Quick Links</h5>
                <ul>
                  <li><a className=" text-lighten-3 text-color" href="#!">Home</a></li>
                  <li><a className=" text-lighten-3 text-color" href="#!">About Us</a></li>
                  <li><a className=" text-lighten-3 text-color" href="#!">Terms & Conditions</a></li>
                  <li><a className=" text-lighten-3 text-color" href="#!">FAQ</a></li>
                </ul>
              </div>
              <div className="col l6 s12">

              </div>
              <div className="col l6 s12">

              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container text-color">
            © 2021 Copyright @ Hasthakatha
            <a className=" text-lighten-4 right text-color" href="#!">More Links</a>
            </div>
          </div>
        </footer>
              
    );
}

export default Footer;