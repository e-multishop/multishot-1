import React, { useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import "./reset.scss";

function Reset_password() {

    const id = useParams();

    return (
        <div className="reset-main">
            <div className="no-margin ">
                <form className="reset-form">
                <h3 className="center-align logo-name">HasthaKatha</h3>
                    <h5>Reset Password</h5>
                    <div class="input-field ">
                        <input id="password" type="password" className="validate" />
                        <label for="password">Password</label>
                    </div>
                    <div className="input-field ">
                        <input id="confirm_password" type="password" className="validate" />
                        <label for="confirm_password">Confirm Password</label>
                    </div>
                    <p className="status">{status}</p>
                    <div className="button center-align">
                        <a className="waves-effect waves-light btn reset-btn">Submit</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Reset_password;
