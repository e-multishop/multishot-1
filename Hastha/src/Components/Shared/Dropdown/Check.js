import React, { useEffect } from 'react'
import Dropdown from './Dropdown';
function Check() {
    useEffect(()=>{
        const dropdown2 = document.getElementById("dropdown-main");
        var elems = modal1.querySelectorAll('.dropdown-trigger');
        const options = {};
        var instances = M.Dropdown.init(elems, options);
    },[]);
    return (
        <div id="dropdown-main">
            <a class='dropdown-trigger btn' href='#' data-target={'dropdown1'}>Drop Me!</a>
        </div>
    );
}

export default Check;
