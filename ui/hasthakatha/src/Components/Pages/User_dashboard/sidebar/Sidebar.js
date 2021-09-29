import React, { useEffect, useState } from 'react'
import './sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faUser } from '@fortawesome/free-solid-svg-icons'

function Sidebar() {
    return (
        <>
            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">
                                <FontAwesomeIcon icon={faUserCircle} size='2x' className="icon" />  Shiv Prasad
                            </span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">
                                <div>
                                    <FontAwesomeIcon icon={faUser} size='1x' className="icon" />
                                </div>
                                <div>
                                     Shiv Prasad
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
