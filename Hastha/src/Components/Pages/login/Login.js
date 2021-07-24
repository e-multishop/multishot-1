import React, { Component } from 'react';
import "./login.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Signup from "./Signup";
import { BrowserRouter as Router, NavLink} from "react-router-dom";
class Login extends Component {

    render() {
        return (

            <form className="col s6 hk-loginform">
                <div className="leaf">
                    {/* <img src="https://www.jaypore.com/images/leaf_topLeft.png">
                    <img src="https://www.jaypore.com/images/leaf_topright.png"> */}
                </div>
                <div className="col s6 hk-offsetmd">
                    <div className="hk-card">
                        <div class="card-content white-text">
                            <h3>login form</h3>
                        </div>
                        <div class="card-content">
                            <div className="input-field">

                                <label for="username">username</label>
                                <input id="username" type="text" />

                            </div>
                            <div className="input-field">

                                <label for="password">password</label>
                                <input id="password" type="password" />
                                <br/>
                            </div>
                            <div className="input-field">
                            <p>
                                <label>
                                    <input type="checkbox" />
                                    <span>Remmeber </span>
                                    </label>
                            </p>
                            </div>

                            <div className="button">
                                <a class="waves-effect waves-light btn">Submit</a>
                            </div>
                            <div className="join-now">
                             <NavLink exact className="active" to="/signup">joinnow</NavLink>
                            </div>

                        </div>
                    </div>
                </div>
            </form>

            );
    }
}
export default Login;