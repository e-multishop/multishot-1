import React, { useState, Fragment } from 'react';
import "./login.scss";
// import Modal from "./Modal"
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCheck} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../Common/Loader';
// import { useEffect } from 'react/cjs/react.production.min';
// import { useParams } from 'react-router';

const Login = (props) => {
    // const redirect_path=useParams();
    const [login, setLogin] = useState({
        hklogin_emailid: '',
        password: ''
    });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setLogin({ ...login, [e.target.id]: e.target.value });
        setStatus('')
    }
    const onSubmit = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setLoading(true);
        Axios.post("/rest/login", {
            password: login.password
        }).then(res => {
            // console.warn("value is success fill",res.data)
            const token = res.data.token;
            localStorage.setItem('token', token);
            setStatus('')
            setLoading(false);
            // console.log("email",login.email)
            if (props && props.closeModal) {
                props.closeModal(true);
            }
            else {
                document.location.href = "/admin";
            }
            toast.success(<span ><FontAwesomeIcon icon={ faCheck} size='lg' color="white" className="icon toast-icon" />  Success</span>)
            // props.history.push("/about"); 
        }).catch(err => {
            setLoading(false);
            console.warn(err);
            setStatus('Email & password did not match')
        });
    }
    function setViewStatus(value) {
        if (props && props.setVeiwstatus) {
            props.setVeiwstatus(value)
        }
    }
    var show = () => {
        return (
            <Fragment>
                <form className=" hk-loginform">
                    <h5>Sign-In</h5>
                    <div className=" hk-offsetmd">
                        <div className="hk-card">
                            <div class="card-content">
                                <div className="input-field">
                                    <input id="hklogin_emailid" type="email" className="validate" value={login.hklogin_emailid} onChange={(e) => handleChange(e)} />
                                    <label for="hklogin_emailid" className="">Email</label>
                                    <span className="helper-text" data-error="Email is not valid" ></span>
                                </div>
                                <div className="input-field">
                                    <input id="password" type="password" value={login.password} onChange={(e) => handleChange(e)} />
                                    <label for="password">Password</label>
                                </div>
                                <div className="input-field">
                                    <p>
                                        <label>
                                            <input type="checkbox" />
                                            <span>Keep me logged in </span>
                                        </label>
                                        <span className="right forgot">
                                            <button onClick={() => { setViewStatus('forgotpassword') }}
                                            >Forgot Password?
                                            </button>
                                        </span>
                                    </p>
                                </div>
                                <p className="status">{status}</p>
                                <div className="button center-align">
                                    <button class="waves-effect waves-light btn sign-in-btn" onClick={(e) => { onSubmit(e) }}>SIGN IN</button>
                                </div>
                                <div className="join-now center-align">
                                    Not yet a member?<button
                                        onClick={() => { setViewStatus('signup') }}
                                    >JOIN NOW</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Fragment>
        );
    }
    return (
        <div className="hk-login wrapper">
            { loading ? <Loader height="250px"/> : '' }
            { show() }
        </div>
    );

};
export default Login;