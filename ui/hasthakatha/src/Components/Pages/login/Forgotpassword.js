import React,{useState}from 'react'
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCheck} from '@fortawesome/free-solid-svg-icons' 
import Loader from '../../Common/Loader';
import Logo from '../../Common/Logo';

function Forgotpassword(props) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [loader, setLoader] = useState(false);
    const handleChange = (e) => {
        setEmail(e.target.value);
        setStatus('')
    }
    const onSubmit = () => {
        setLoader(true);
        Axios.post("/rest/forgot_password", {
            email: email
        }).then(res => {
            // console.warn("value is success fill")
            // consosle.warn(data.token);
            setStatus('')
            setLoader(false);
            toast.info(<span >
                <FontAwesomeIcon icon={ faCheck} size='lg' color="white" className="icon toast-icon" />  
                If you are registered with us, you should get an email containing instructions to reset your password
                </span>)
            // props.history.push("/about");
            props.closeModal();
        }).catch(err => {
            // console.warn(err);
            // setStatus('Email is not registred')
            setLoader(false);
            props.closeModal();
            toast.info("If you are registered with us, you should get an email containing instructions to reset your password")


        });
    }
    const show = () => {
        return (
            <form className="signup-form">
                <h5>Forgot Password</h5>
                <div className="input-field">
                    <i class="material-icons hs-form-icon">email</i>
                    <input id="email" type="email" className="validate" value={email} onChange={(e) => handleChange(e)} />
                    <label for="email">Email</label>
                    {/* <span className="helper-text" data-error="Email is not valid" data-success="right"></span> */}
                    <br />
                </div>
                <p className="status">{status}</p>
                <div className="button center-align">
                <a className="waves-effect waves-light btn signup-btn" onClick={()=>onSubmit()}>Submit</a>
                    </div>
            </form>
        )
    };
    return (
        <>
            <Logo />
            <div className="row no-margin hk-forgot-password hk-account wrapper">
                { loader ? <Loader height="250px" /> : ''}
                { show() }
            </div>
        </>
    );
}

export default Forgotpassword;
