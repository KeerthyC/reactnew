import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';



const UserPremsg = () => { 
    return (

      <div style={{
        background: 'transparent linear-gradient(to right, #005d1f 0%, #277816 50%, #005d1f 100%) 0% 0% no-repeat padding-box',
        height: '100vh',
        color: '#fff',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '5rem' }}>Congratulations</h1>
        <p style={{ fontSize: '2rem' }}></p>
        <p style={{ fontSize: '1.5rem' }}>Kindly note that your assessment test has  been submitted. We will be reviewing your score and based
    on that we may schedule next interview session .Good Luck </p>
      </div>


    );  
};

export default UserPremsg;