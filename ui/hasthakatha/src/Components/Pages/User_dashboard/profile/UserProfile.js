import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import './profile.scss'

function UserProfile() {
    const [userData,setUserData]=useState([])
    useEffect(()=>{
        axios.get('/rest/user_profile/'+localStorage.getItem('userId')).then(res=>{
            setUserData(res.data);
        })
    },[])
    return (
        <>
            <div className="profile-section">
                <div className="profile-form">
                    <h2>Personal Information</h2>
                    <div >
                        <form className="col s10" id="country">
                            <div className="hk-formcontent">
                                <div className="row">
                                    <div className="input-field col s10 ">
                                        <input id="fullname" name="name" type="text" className="validate" value=""/>
                                        <label for="fullname">Full Name (First and Last Name)</label>
                                    </div>
                                    <div className="input-field col s10 ">
                                        <p className="gender-title">Your Gender</p>
                                        <div className="gender-section">
                                            <p>
                                                <label>
                                                    <input type="checkbox" class="filled-in" checked="checked" />
                                                    <span>Male</span>
                                                </label>
                                            </p>
                                            <p>
                                                <label>
                                                    <input type="checkbox" class="filled-in" checked="checked" />
                                                    <span>Female</span>
                                                </label>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="input-field col s10 ">
                                        <input id="email" type="email" className="validate" name="email" value={userData.name} />
                                        <label for="email">Email Address</label>
                                    </div>
                                    <div className="input-field col s10">
                                        <input id="mobile_number" type="number" name="phone" className="validate" value={userData.phone}/>
                                        <label for="mobile_number">Mobile Number</label>
                                    </div>
                                </div>
                                <div className="button">
                                    <a class="waves-effect waves-light btn btn-color" >Edit</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile;
