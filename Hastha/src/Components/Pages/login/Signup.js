import React,{ Component } from "react";
import "./signup.scss";

class Signup extends Component{
    render() {
        return (
                <div className="row no-margin ">
                        <form className="signup-form">
                        <h5>Sign-Up</h5>
                                    <div className="input-field">
                                        <input id="email" type="email" className="validate" />
                                        <label for="email">Email</label>
                                        {/* <span className="helper-text" data-error="wrong" data-success="right"></span> */}
                                    </div>
                                    <div class="input-field ">
                                        <input id="password" type="password" class="validate"/>
                                        <label for="password">Password</label>
                                    </div>
                                    <div class="input-field ">
                                        <input id="password" type="password" class="validate"/>
                                        <label for="password">Confirm Password</label>
                                    </div>
                                <div className="button center-align">
                                    <a class="waves-effect waves-light btn signup-btn">Submit</a>
                                </div>
                        </form>                        
                </div>
    
        );
    }
}

export default Signup;