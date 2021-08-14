import React, { useState } from 'react';
import "./login.scss";
import Modal from "./Modal"
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const Login = (props) => {

    const [login, setLogin] = useState({
        emailid: '',
        password: '',
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setLogin({ ...login, [e.target.id]: e.target.value });
        setStatus('')
    }
    const onSubmit = () => {
        Axios.post("http://localhost:3000/rest/login", {
            email: login.emailid,
            password: login.password
        }).then(res => {
            // console.warn("value is success fill")
            console.log(res.data.token);
            myStorage = window.localStorage;
            setStatus('')
            toast.success("Success")
            // props.history.push("/about");
            props.closeModal();
        }).catch(err => {
            console.warn(err);
            setStatus('Email id  & password did not match')
        });
    }

    return (
        <div>
            <form className=" hk-loginform">
                <h5>Sign-In</h5>
                <div className=" hk-offsetmd">
                    <div className="hk-card">
                        <div class="card-content">
                            <div className="input-field">
                                <input id="emailid" type="email" className="validate" value={login.emailid} onChange={(e) => handleChange(e)} />
                                <label for="email">Email</label>
                                <span className="helper-text" data-error="Emailis is not valid" ></span>
                            </div>
                            <div className="input-field">

                                <label for="password">password</label>
                                <input id="password" type="password" value={login.password} onChange={(e) => handleChange(e)} />
                                <br />
                            </div>
                            <div className="input-field">
                                <p>
                                    <label>
                                        <input type="checkbox" />
                                        <span>Keep me logged in </span>
                                    </label>
                                    <span className="right forgot">
                                        <button onClick={() => { props.setVeiwstatus('forgotpassword') }}
                                        >Forgot Password?
                                        </button>
                                    </span>
                                </p>
                            </div>
                            <p className="status">{status}</p>
                            <div className="button center-align">
                                <button class="waves-effect waves-light btn sign-in-btn" onClick={()=>{onSubmit()}}>SIGN IN</button>
                            </div>
                            <div className="join-now center-align">
                                Not yet a member?<button
                                    onClick={() => { props.setVeiwstatus('signup') }}
                                >JOIN NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );

};
export default Login;