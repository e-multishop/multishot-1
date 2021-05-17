import React from 'react';
import "./Footer.css";

const Footer =()=>{
    return(
        <footer className="page-footer hk-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Hasthakatha</h5>
                <p className="grey-text text-lighten-4">Mob: +918756345678 <br/> email-hasthakatha@gmail.com</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Quick Links</h5>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="#!">Home</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">About Us</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Terms & Conditions</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">FAQ</a></li>
                </ul>
              </div>
              <div className="col l6 s12">

              </div>
              <div className="col l6 s12">

              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2021 Copyright @ Hasthakatha
            <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
            </div>
          </div>
        </footer>
              
    );
}

export default Footer;