import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Ratings from './UserRating';











const UserPostmsg = () => { 
    const navigate = useNavigate();


    useEffect(() => {
        // Check if a specific value exists in localStorage
        const storedValueauth = localStorage.getItem('auth');
        const storedValuedj = localStorage.getItem('djangoToken');

        if (storedValueauth || storedValuedj) {
          // The value exists in localStorage, do something with it
          //console.log('Found value:', storedValue);
        } else {
          // The value does not exist in localStorage
         // console.log('Value not found');
          navigate('/');

        }
      }, []); // The empty array causes this effect to only run on mount
    



    return (<div>


<div class="container-fluid text-center">
  <div class="row">
    
    <div class="col-sm-5" style={{background:'#ffffff',padding:'85px',lineHeight:'1.7em',paddingTop:'10%',height:'100vh',textAlign:'left'}}>
<h5 style={{color:'#576871',fontWeight:'400',marginBottom:'50px'}}>Hey {localStorage.getItem("CName")}</h5>

     
    <h1 style={{fontWeight:'700',marginTop:'20px'}}> Well Done!! </h1>
    <h3 style={{color:'#39424e',fontWeight:'normal',lineHeight:'1.3em'}}>Congratulations on completing the test! No further action is required. Our team will contact you soon.</h3>
    </div>
    <div class="col-sm-7" style={{background:'#f3f7f7',padding:'85px',lineHeight:'1.7em',paddingTop:'10%',height:'100vh'}}>
    <h2 class="d-block test-instructions__title" style={{color:'#39424e',fontWeight:'400',fontSize:'25px'}}>We'd love to hear your thoughts! Please share your experience with the test.</h2>
    <hr/>
    <Ratings/>
    </div>
  </div>
</div>


 
</div>
    );  
};

export default UserPostmsg;