import React from 'react';
import "./login.scss";
import Modal from "./Modal"

const Login = (props) => {
    return (
        <div>
            <form className=" hk-loginform">
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
                                    <span className="right forgot">
                                        <button onClick={() => {props.setVeiwstatus('forgotpassword') }}
                                        >Forgot Password?
                                        </button>
                                    </span>
                                </p>
                            </div>
                            <div className="button center-align">
                                <a class="waves-effect waves-light btn sign-in-btn">SIGN IN</a>
                            </div>
                            <div className="join-now center-align">
                                Not yet a member?<button
                                    onClick={() => {props.setVeiwstatus('signup') }}
                                >JOIN NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    );

};
export default Login;