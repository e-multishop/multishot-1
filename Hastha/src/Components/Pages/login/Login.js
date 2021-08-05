import React, { Component, useEffect } from 'react';
import "./login.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Signup from "./Signup";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

const Login = () => {
    useEffect(() => {
        const modal1 = document.getElementById("login");
        var elems = modal1.querySelectorAll('.modal');
        const options = {};
        var instances = M.Modal.init(elems, options);
    });
    return (
        <div id="login">
            {/* <!-- Modal Trigger --> */}
            {/* <NavLink className="waves-effect waves-light btn modal-trigger" to="#modal-login">Modal</NavLink> */}

            {/* <!-- Modal Trigger --> */}
            <button data-target="modal-login" className="btn modal-trigger">Modal</button>

            {/* <!-- Modal Structure --> */}
            <div id="modal-login" className="modal">
                <div class="modal-content">
                    <div >
                        <h3 className="center-align logo-name">HasthaKatha</h3>
                    </div>

                    <form className=" hk-loginform">
                        {/* <div className="leaf">
                            <img src="https://www.jaypore.com/images/leaf_topLeft.png">
                     <img src="https://www.jaypore.com/images/leaf_topright.png">
                        </div> */}
                        <h5>Sign-In</h5>
                        <div className=" hk-offsetmd">
                            <div className="hk-card">
                                <div class="card-content">
                                    <div className="input-field">
                                        <label for="username">username</label>
                                        <input id="username" type="text" />

                                    </div>
                                    <div className="input-field">

                                        <label for="password">password</label>
                                        <input id="password" type="password" />
                                        <br />
                                    </div>
                                    <div className="input-field">
                                        <p>
                                            <label>
                                                <input type="checkbox" />
                                                <span>Keep me logged in </span>
                                            </label>
                                            <span className="right">
                                                Forgot Password?
                                            </span>
                                        </p>

                                    </div>

                                    <div className="button center-align">
                                        <a class="waves-effect waves-light btn sign-in-btn">SIGN IN</a>
                                    </div>
                                    <div className="join-now center-align">
                                        Not yet a member?<button data-target="modal-signup" className=" modal-trigger">JOIN NOW</button>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                    {/* Signup modal component call */}

                </div>
                {/* <div className="modal-footer ">
                    <NavLink href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</NavLink>
                </div> */}
            </div>
            <div id="modal-signup" className="modal">
                <div class="modal-content">
                    <div >
                        <h3 className="center-align logo-name">HasthaKatha</h3>
                    </div>
                    <Signup />
                </div>
            </div>
        </div>
    );

};
export default Login;