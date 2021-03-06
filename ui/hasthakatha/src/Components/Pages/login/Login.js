import React, { useState, Fragment, useEffect } from 'react';
import "./login.scss";
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../Common/Loader';
import { AdminLogin } from '../../../Redux/actions/index';
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import Logo from '../../Common/Logo';

const Login = (props) => {
    var dispatch = useDispatch();
    const [login, setLogin] = useState({
        hklogin_emailid: '',
        password: ''
    });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('token');
        if (isLoggedIn) {
            if (props.history) {
                props.history.push('/page-not-found');
            }
        }
    })
    const handleChange = (e) => {
        setLogin({ ...login, [e.target.id]: e.target.value });
        setStatus('')
    }
    const onSubmit = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setLoading(true);
        Axios.post("/rest/login", {
            email: login.hklogin_emailid,
            password: login.password
        }).then(res => {
            // console.warn("value is success fill",res.data)
            const session_id = res.data.session_id;

            var decodedSessionId = jwt_decode(session_id);
            // console.log("check decode value=", decodedSessionId.userId);
            localStorage.setItem('userId',decodedSessionId.userId);
            localStorage.setItem('userEmail',decodedSessionId.email);
            localStorage.setItem('userType', decodedSessionId.userType);
            localStorage.setItem('token', session_id);
            dispatch(AdminLogin(decodedSessionId.userType === 1))
            setStatus('')
            setLoading(false);
            // console.log("email",login.email)
            if (props && props.closeModal) {
                props.closeModal(true);
            }
            else {
                
                const redirectPath = new URLSearchParams(props.location.search).get("redirect_path");
                if (redirectPath) {
                    if (redirectPath === '/admin') {
                        document.location.href = "/admin";
                    } else {
                        // props.history.push(redirectPath);
                        document.location.href = '/#' + redirectPath;
                    }
                } else {
                    props.history.push('/');
                }
            }
            toast.success(<span ><FontAwesomeIcon icon={faCheck} size='lg' color="white" className="icon toast-icon" />  Success</span>)
            // props.history.push("/about"); 
        }).catch(err => {
            setLoading(false);
            console.warn(err);
            setStatus(err.response.data.message);
        });
    }
    function setViewStatus(value) {
        if (props && props.setVeiwstatus) {
            // inside modal
            props.setVeiwstatus(value)
        } else {
            // as a page
            document.location.href = `/#/${value}`;
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
                                    <i className="material-icons hs-form-icon">email</i>
                                    <input id="hklogin_emailid" type="email" className="validate" value={login.hklogin_emailid} onChange={(e) => handleChange(e)} />
                                    <label for="hklogin_emailid" className="">Email</label>
                                    <span className="helper-text" data-error="Email is not valid" ></span>
                                </div>
                                <div className="input-field">
                                    <i className="material-icons hs-form-icon">vpn_key</i>
                                    <input id="password" type="password" value={login.password} onChange={(e) => handleChange(e)} />
                                    <label for="password">Password</label>
                                </div>
                                <div className="input-field">
                                    <p>
                                        <label>
                                            <input type="checkbox" />
                                            <span className="ft-12">Keep me logged in </span>
                                        </label>
                                        <span className="right forgot">
                                            <button className="ft-12" onClick={() => { setViewStatus('forgotpassword') }}
                                            >Forgot Password?
                                            </button>
                                        </span>
                                    </p>
                                </div>
                                <p className="status">{status}</p>
                                <div className="button center-align">
                                    <button className="waves-effect waves-light btn sign-in-btn" onClick={(e) => { onSubmit(e) }}>SIGN IN</button>
                                </div>
                                <div className="join-now center-align ft-12">
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
        <>
            <Logo />
            <div className="hk-login hk-account wrapper">
                { loading ? <Loader height="250px" /> : ''}
                { show()}
            </div>
        </>
    );

};
export default Login;