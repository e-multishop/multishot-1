import React, { useState, useEffect } from 'react'
import Signup from './Signup';
import Login from './Login';
import Forgotpassword from './Forgotpassword'

function Modal(props) {

    useEffect(() => {
        const modal1 = document.getElementById("modal-share");
        var elems = modal1.querySelectorAll('.modal');
        const options = {};
        var instances = M.Modal.init(elems, options);
        instances[0].open();

    });
    const [viewstatus, setVeiwstatus] = useState("Login");
    const show = () => {
        switch (viewstatus) {
            case 'Login':
                return (<Login setVeiwstatus={setVeiwstatus}/>);
                break;
            case 'signup':
                return (<Signup />);
                break;
            case 'forgotpassword':
                return (<Forgotpassword />);
                break;
            default:
                return (<Login setVeiwstatus={setVeiwstatus}/>)
                break;
        }
    }

    return (
        <div id="modal-share">
            <div id="modal1" class="modal">
                <div class="modal-content">
                    <div >
                        <h3 className="center-align logo-name">HasthaKatha</h3>
                    </div>
                    {show()}
                </div>
            </div>
        </div>
    );
}

export default Modal;
