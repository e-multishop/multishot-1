import React from 'react';


class Contact extends React.Component {

    constructor(props) {
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
            <>
                <div className="row hk-contactus">
                    <form className="col s6">
                        <div className="pad28">
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="first_name" type="text" className="validate" />
                                    <label for="first_name">First Name</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="last_name" type="text" className="validate" />
                                    <label for="last_name">Last Name</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="email" type="email" className="validate" />
                                    <label for="email">Email</label>
                                    <span className="helper-text" data-error="wrong" data-success="right"></span>
                                </div>
                            </div>
                            <div class="row">
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea"></textarea>
                                    <label for="textarea1">Textarea</label>
                                </div>
                            </div>
                            <div className="button">
                                <a class="waves-effect waves-light btn">Submit</a>
                            </div>
                        </div>

                    </form>
                    <div className="col s6">
                        <div className="row hk-bgcolor">


                            <h2 className="hk-subtitle">CONTACT US</h2>
                            <p className="hk-content">Feel free to contact us for any <b>queries, feedback</b> or just to say <b>hello!</b></p>
                            <p className="hk-email"> Email: hastha@gmail.com </p>
                        </div>

                    </div>
                </div>

            </>
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