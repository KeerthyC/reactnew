// DashboardLayout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import VerticalMenu from './AdminSidebar';
import TopMenu from './AdminTopbar';
import ContentArea from './AdminContent';
import './DashboardLayout.css'; // Import your CSS for styling

const DashboardLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if a specific value exists in localStorage
        const usertype = localStorage.getItem('usertype');
        const authkey = localStorage.getItem('authKey');

        if (usertype =="admin" && authkey) {
          // The value exists in localStorage, do something with it
        } else {
          // The value does not exist in localStorage
          console.log('Value not found');
          navigate('/adminheink');

        }
      }, []); // The empty array causes this effect to only run on mount
    


  

  return (
    <div className="dashboard-layout">
      <VerticalMenu />
      <div className="main-area">
        <TopMenu />
        <ContentArea />
      </div>
    </div>
  );
};

export default DashboardLayout;