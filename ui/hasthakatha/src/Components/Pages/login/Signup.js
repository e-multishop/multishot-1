import React, { useState } from "react";
import "./signup.scss";
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCheck} from '@fortawesome/free-solid-svg-icons'
import Loader from "../../Common/Loader";
import Logo from "../../Common/Logo";

const Signup = (props) => {
    const [signup, setSignup] = useState({
        hksignup_emailid: '',
        password: '',
        confirm_password: ''
    });

    const [status, setStatus] = useState('');
    const [loader, setLoader] = useState(false);
    const handleChange = (e) => {
        setSignup({ ...signup, [e.target.id]: e.target.value });
        setStatus('');
    }

    const onSubmit = () => {
        if (signup.password !== signup.confirm_password) {
            setStatus('Password did not match');
        }
        else {
            setLoader(true);
            Axios.post("/rest/signup", {
                email: signup.hksignup_emailid,
                password: signup.password
            }).then(res => {
                setStatus('')
                setLoader(false);
                if (props && props.closeModal) {
                    toast.success(<span ><FontAwesomeIcon icon={ faCheck} size='lg' color="white" className="icon toast-icon" />  Success</span>)
                    props.closeModal(true);
                } else {
                    const redirectPath = new URLSearchParams(props.location.search).get("redirect_path");
                    if (redirectPath) {
                        document.location.href = '/#' + redirectPath;
                    } else {
                        props.history.push('/');
                    }
                }
            }).catch(err => {
                // console.warn(err);
                setLoader(false);
                setStatus(err.response.data.message);
            });
        }
    }
    const show = () => {
        return (
            <form className="signup-form">
                <h5>Sign-Up</h5>
                <div className="input-field">
                    <i className="material-icons hs-form-icon">email</i>
                    <input id="hksignup_emailid" type="email" className="validate" value={signup.hksignup_emailid} onChange={(e) => handleChange(e)} />
                    <label for="hksignup_emailid">Email</label>

                    {/* <span className="helper-text" data-error="wrong" data-success="right"></span> */}
                </div>
                <div className="input-field ">
                    <i className="material-icons hs-form-icon">vpn_key</i>
                    <input id="password" type="password" className="validate" value={signup.password} onChange={(e) => handleChange(e)} />
                    <label for="password">Password</label>

                </div>
                <div className="input-field">
                    <i className="material-icons hs-form-icon">vpn_key</i>
                    <input id="confirm_password" type="password" className="validate" value={signup.confirm_password} onChange={(e) => handleChange(e)} />
                    <label for="confirm_password">Confirm Password</label>
                </div>
                <p className="status">{status}</p>
                <div className="button center-align">
                    <a className="waves-effect waves-light btn signup-btn" onClick={() => onSubmit()}>Submit</a>
                </div>
            </form>
        )
    }
    return (
        <>
            <Logo />
            <div className="row no-margin hk-signup hk-account wrapper">
                { loader ? <Loader height="250px" /> : ''}
                { show() }
            </div>
        </>

    );
}

export default Signup;