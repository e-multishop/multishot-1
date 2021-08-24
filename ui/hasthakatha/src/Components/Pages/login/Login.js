import React, { useState } from 'react';
import "./login.scss";
// import Modal from "./Modal"
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react/cjs/react.production.min';
import { useParams } from 'react-router';

const Login = (props) => {
    // const redirect_path=useParams();
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
        Axios.post("/rest/login", {
            email: login.emailid,
            password: login.password
        }).then(res => {
            // console.warn("value is success fill",res.data)
            const token= res.data.token;
            localStorage.setItem('token',token);
            setStatus('')
            // console.log("email",login.email)
            if(props && props.closeModal){
                props.closeModal(true);
            }
            else{
                document.location.href="/admin";
            }
            toast.success("Success")
            // props.history.push("/about");
        }).catch(err => {
            console.warn(err);
            setStatus('Email id  & password did not match')
        });
    }
    function setViewStatus(value){
        if(props && props.setVeiwstatus){
            props.setVeiwstatus(value)
        }
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
                                        <button onClick={() => {setViewStatus('forgotpassword') }}
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
                                    onClick={() => {setViewStatus('signup')}}
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