import React from 'react';

const AdminSidebar = () => {
  return (
    <nav className="vertical-menu">
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Logout</a></li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;