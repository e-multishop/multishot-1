import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import "./reset.scss";
import Loader from '../../Common/Loader';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

function Reset_password() {
    const id = useParams();
    useEffect(() => {
        Axios.get('/rest/validate_token').then((res) => {
            console.log(res.data);
        })
    },[]);
    const [reset, setReset] = useState({
        password: '',
        confirm_password: ''
    })
    const [status, setStatus] = useState('');
    const [loader, setLoader] = useState(false);

    const handleChange = (e) => {
        setReset({ ...reset, [e.target.id]: e.target.value });
        setStatus('');
    }
    const onSubmit = () => {
        if (reset.password !== reset.confirm_password) {
            setStatus('Password did not match');
        }
        else {
            setLoader(true);
            Axios.post("/rest/reset", {
                password: reset.password
            }).then(res => {
                setStatus('')
                setLoader(false);
                toast.success(<span ><FontAwesomeIcon icon={ faCheck} size='lg' color="white" className="icon toast-icon" />  Success</span>)
            }).catch(err => {
                // console.warn(err);
                setLoader(false);
            });
        }
    }
    return (
        <>
            <Header />
            <div className="reset-main">
                <div className="no-margin ">
                    <form className="reset-form">
                        <h3 className="center-align logo-name">HasthaKatha</h3>
                        <h5>Reset Password</h5>
                        <div class="input-field ">
                            <input id="password" type="password" className="validate" value={reset.password} onChange={(e) => handleChange(e)}  />
                            <label for="password">Password</label>
                        </div>
                        <div className="input-field ">
                            <input id="confirm_password" type="password" className="validate" value={reset.confirm_password} onChange={(e) => handleChange(e)} />
                            <label for="confirm_password">Confirm Password</label>
                        </div>
                        <p className="status red-text center-align">{status}</p>
                        <div className="button center-align">
                            <a className="waves-effect waves-light btn reset-btn" onClick={()=>onSubmit()}>
                                Submit</a>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Reset_password;
