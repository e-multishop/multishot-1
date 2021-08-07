import React from 'react'

function Forgotpassword() {
    return (
            <div className="row no-margin ">
                        <form className="signup-form">
                        <h5>Forgot Password</h5>
                                <div className="input-field">
                                        <input id="email" type="email" className="validate" />
                                        <label for="email">Email</label>
                                        <span className="helper-text" data-error="Email is not valid" data-success="right"></span>
                                        <br/>
                                    </div>                                   
                                <div className="button center-align">
                                    <a type="submit" class="waves-effect waves-light btn signup-btn">Submit</a>
                                </div>
                        </form> 
            </div> 
    );
}

export default Forgotpassword;
