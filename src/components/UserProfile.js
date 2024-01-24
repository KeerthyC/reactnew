// src/components/UserProfile.js

import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

function UserProfile({ user }) {
  // Check if the user object is available
  if (!user) {
    return <p>Loading user data...</p>; // Or some other placeholder content
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* Add more user details here */}
    </div>
  );
}

// Set the PropTypes for UserProfile
UserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    // Add other user object properties here if there are any
  }),
};

export default UserProfile;
