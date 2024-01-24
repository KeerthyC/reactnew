import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AdminUserTestLists from './AdminUserTestLists.js';
import AdminUserLists from './AdminUserList.js';




const ContentArea = () => {
  return (
    <div className="content-area">
      <div className="container ">
      <div className="row align-items-start">
    <div className="col">
    <Card>
      <Card.Header style={{textAlign: 'left'}}>Available Candidates Tests</Card.Header>
      <Card.Body>
      <AdminUserTestLists/>        
      </Card.Body>
    </Card>
    </div>
   
    
  </div>
  <div className="row align-items-start" style={{marginTop: '50px'}}>
   
    <div className="col">
    <Card>
      <Card.Header style={{textAlign: 'left'}}>Test Attended Candidates</Card.Header>
      <Card.Body style={{overflow:'scroll'}}>
       
        <Card.Text>
        <AdminUserLists/>   
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    
  </div>
</div>
    </div>
  );
};

export default ContentArea;