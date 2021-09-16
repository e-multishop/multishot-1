import React from 'react';
import "./Footer.scss";
import logo from "../../Images/logo.png";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const Footer =()=>{
  const handleAdmin=()=>{
    document.location.href="/admin"
  }
  const [isAdmin, setIsAdmin] = useState(false);
  const isAdminUser = useSelector((state) => state.AdminDashboard);
  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType === '1') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  })
    return(
        
        <footer className="page-footer hk-footer">
          <div className="container">
            <div className="row">
              <div className="col l4 s12">
                <NavLink to="/"><img src={logo} alt="logo" className="logo"/></NavLink>
                {/* <h5 className="text-color">Hasthakatha</h5> */}
                {/* <p className=" text-lighten-4 text-color">email-hasthakatha@gmail.com</p> */}
                <p><a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=hasthakatha@gmail.com" target="_blank" className="text-lighten-4 text-color"><FontAwesomeIcon icon={faEnvelope} size="large" className=""/> hasthakatha@gmail.com </a></p>
              </div>
              <div className="col l3 offset-l2 s12">
                <h5 className="text-color">Quick Links</h5>
                <ul>
                  <li><NavLink className=" text-lighten-3 text-color" to="/">Home</NavLink></li>
                  <li><NavLink className=" text-lighten-3 text-color" to="/about">About Us</NavLink></li>
                 {isAdmin || isAdminUser ?<li className=" text-lighten-3 text-color admin-dashboard" onClick={handleAdmin}>Admin Dashboard</li>:""} 
                  <li><NavLink className=" text-lighten-3 text-color" to="/">Terms & Conditions</NavLink></li>
                  <li><NavLink className=" text-lighten-3 text-color" to="/">FAQ</NavLink></li>
                </ul>
              </div>
              <div className="col l3 s12">
                  <h5 className="text-color">Follow Us</h5>
                  <div className="hk-social-icon">
                      <a href="https://www.facebook.com/Hastha-Katha-1102781866557529/" target="_blank">
                        <FontAwesomeIcon icon={faFacebook} size="2x" className="hk-facebook-icon"/>
                      </a>
                      <a href="https://twitter.com/hastha_katha" target="_blank">
                        <FontAwesomeIcon icon={faTwitter} size="2x" className="hk-twitter-icon"/>
                      </a>
                      <a href="https://www.instagram.com/hastha_katha/?hl=en" target="_blank">
                        <FontAwesomeIcon icon={faInstagram} size="2x" className="hk-instagram-icon" />
                      </a>
                      <a href="https://www.youtube.com/channel/UC9sVRnf6s_hK9wuAGKOUGag/featured" target="_blank">
                        <FontAwesomeIcon icon={faYoutube} size="2x" className="hk-youtube-icon" />
                      </a>
                  </div>
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