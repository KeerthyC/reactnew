import React from 'react';
import './UserProfile.css';

function UserProfile() {
    // Retrieve user details from localStorage
    const profilePhoto = localStorage.getItem('CPhoto');
    const email = localStorage.getItem('CEmail');
    const name = localStorage.getItem('CName');

    return (
        <div className="user-profile" style={{color:'#333',float:'right'}}>
            {profilePhoto && <img src={profilePhoto} alt="Profile" className="profile-photo" />}
            <div className="user-details">
                <h2 style={{fontSize:'20px'}}>{name}</h2>

                <p style={{fontSize:'15px'}}>{email}</p>
            </div>
        </div>
    );
}

export default UserProfile;
