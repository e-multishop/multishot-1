import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import './profile.scss'

function UserProfile() {
    const [userData,setUserData] = useState({});
    const fatchData = () => {
        axios.get('/rest/user_profile/' + localStorage.getItem('userId')).then(res => {
            setUserData(res.data.result);
            localStorage.setItem('userName',res.data.result.name);
        })
    }
    // const [updateData, setUpdateData] = useState({
    //     name: userData.name,
    //     phone: userData.phone,
    //     age: userData.age
    // });
    useEffect(() => {
        fatchData();
    },[])

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const updateProfile = () => {
        axios.put('/rest/user_profile', {
            userid: localStorage.getItem('userId'),
            name: userData.name,
            phone: userData.phone,
            age: userData.age,
            profile_picture: ''
        }).then(res => {
            toast.success("Product updated successfully");
        }).catch(err => {
            toast.error("Error updating profile. Please try again later.")
        })
    }

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
                                        <input id="fullname" name="name" type="text" className="validate" value={userData.name} onChange={(e) => handleChange(e)} />
                                        <label for="fullname" className="active">Full Name (First and Last Name)</label>
                                    </div>
                                    {/* <div className="input-field col s10 ">
                                        <p className="gender-title">Your Gender</p>
                                        <div className="gender-section">
                                            <p>
                                                <label>
                                                    <input type="radio" class="filled-in" name="gender" checked />
                                                    <span>Male</span>
                                                </label>
                                            </p>
                                            <p>
                                                <label>
                                                    <input type="radio" class="filled-in" name="gender" />
                                                    <span>Female</span>
                                                </label>
                                            </p>
                                        </div>
                                    </div> */}
                                    <div className="input-field col s10 ">
                                        <input id="email" type="text" className="validate" name="email" value={userData.email} />
                                        <label for="email" class="active">Email Address</label>
                                    </div>
                                    <div className="input-field col s5">
                                        <input id="mobile_number" type="number" name="phone" className="validate" value={userData.phone} onChange={(e) => handleChange(e)} />
                                        <label for="mobile_number" class="active" >Mobile Number</label>
                                    </div>
                                    <div className="input-field col s5">
                                        <input id="age" min="5" max="100" type="number" name="age" className="validate" value={userData.age} onChange={(e) => handleChange(e)} />
                                        <label for="age" class="active" >Age</label>
                                    </div>
                                </div>
                                <div className="button">
                                    <a class="waves-effect waves-light btn btn-color" onClick={() => { updateProfile() }}>Update</a>
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
