import React, { useState, useEffect } from 'react'
import Signup from './Signup';
import Login from './Login';
import Forgotpassword from './Forgotpassword'
// import {useHistory} from 'react-router-dom';

function Modal(props) {
    // let history =useHistory();
    var modal;
    useEffect(() => {
        const modal1 = document.getElementById("modal-share");
        var elems = modal1.querySelectorAll('.modal');
        const options = {};
        var instances = M.Modal.init(elems, options);
        // instances[0].open();
        modal=instances[0];
        modal.open();

    });
    const closeModal=()=>{
        // modal.destroy();
        modal.close();
        props.destroydata();
    }
    const [viewstatus, setVeiwstatus] = useState("Login");
    const show = () => {
        switch (viewstatus) {
            case 'Login':
                return (<Login setVeiwstatus={setVeiwstatus} closeModal={closeModal}/>);
                break;
            case 'signup':
                return (<Signup closeModal={closeModal}/>);
                break;
            case 'forgotpassword':
                return (<Forgotpassword closeModal={closeModal}/>);
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
