import React,{useState}from 'react'
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

function Forgotpassword(props) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    
    const handleChange = (e) => {
        setEmail(e.target.value);
        setStatus('')
    }
    const onSubmit = () => {

        Axios.post("/rest/forgot_password", {
            email: email
        }).then(res => {
            // console.warn("value is success fill")
            // consosle.warn(data.token);
            setStatus('')
            toast.success("Success")
            // props.history.push("/about");
            props.closeModal();
        }).catch(err => {
            // console.warn(err);
            setStatus('Email is not registred')
        });
    }
    return (
        <div className="row no-margin ">
            <form className="signup-form">
                <h5>Forgot Password</h5>
                <div className="input-field">
                    <input id="email" type="email" className="validate" value={email} onChange={(e) => handleChange(e)} />
                    <label for="email">Email</label>
                    <span className="helper-text" data-error="Email is not valid" data-success="right"></span>
                    <br />
                </div>
                <p className="status">{status}</p>
                <div className="button center-align">
                <a className="waves-effect waves-light btn signup-btn" onClick={()=>onSubmit()}>Submit</a>
                       </div>
            </form>
            <ToastContainer />

        </div>
    );
}

export default Forgotpassword;
