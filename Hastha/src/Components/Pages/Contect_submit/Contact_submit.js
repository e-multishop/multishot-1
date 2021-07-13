import React from 'react';
import "./ContactUs.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
class Contact extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            message: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:3002/send', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(
            (response) => (response.json())
        ).then((response) => {
            if (response.status === 'success') {
                alert("Message Sent.");
                this.resetForm()
            } else if (response.status === 'fail') {
                alert("Message failed to send.")
            }
        })
    }
    render() {
        return (
                <div className="row hk-contactus no-margin">
                        <form className="col s6 hk-contactform">
                            <div className="hk-formcontent">
                                <div className="row">
                                    <div className="input-field col s6 ">
                                        <input id="first_name" type="text" className="validate" />
                                        <label for="first_name">First Name</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="last_name" type="text" className="validate" />
                                        <label for="last_name">Last Name</label>
                                    </div>
                                    <div className="input-field col s12 ">
                                        <input id="email" type="email" className="validate" />
                                        <label for="email">Email</label>
                                        <span className="helper-text" data-error="wrong" data-success="right"></span>
                                    </div>
                                    <div className="input-field col s12 ">
                                        <textarea id="textarea1" className="materialize-textarea"></textarea>
                                        <label for="textarea1">Your Message</label>
                                    </div>
                                </div>
                                <div className="button">
                                    <a class="waves-effect waves-light btn">Submit</a>
                                </div>
                            </div>
                        </form>
                        <div className="col s6  hk-bgcolor">
                                <h2 className="hk-subtitle">CONTACT US</h2>
                                <p className="hk-content no-margin">Feel free to contact us for any <br/><b>queries, feedback</b> or just to say <br/><b>hello!</b></p>
                                <p><a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=hasthakatha@gmail.com" target="_blank" className="hk-email"><FontAwesomeIcon icon={faEnvelope} size="large"/> hasthakatha@gmail.com </a></p>

                        </div>
                </div>

        );
    }
    onNameChange(event) {
        this.setState({ name: event.target.value })
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value })
    }

    onMessageChange(event) {
        this.setState({ message: event.target.value })
    }
}
export default Contact;