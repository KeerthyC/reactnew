import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';


const Topbar = () => {
  return (
    
        <div class="d-flex flex-row-reverse">
  <div class="p-2"></div>
  <div class="p-2"></div>
  <div class="p-2"><Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        User Profile
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown></div>
</div>
   
    
  );
};

export default Topbar;