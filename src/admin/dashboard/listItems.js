import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import LogoutIcon from '@mui/icons-material/Logout';


const MainListItems = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
      // Implement logout logic
      sessionStorage.removeItem('sessionToken');
      sessionStorage.removeItem('sessionUser');

      // Redirect to login page
      navigate('/adminheink');
  };

  return (
    <React.Fragment>
    <Link to="/newdash" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="/admin/dash/candidates" style={{ textDecoration: 'none', color: 'inherit' }}>
    <ListItemButton>
      <ListItemIcon>
      <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Candidates" />
    </ListItemButton>
    </Link>
    <Link to="/admin/dash/filter" style={{ textDecoration: 'none', color: 'inherit' }}>
    <ListItemButton>
      <ListItemIcon>
      <FilterAltIcon />
      </ListItemIcon>
      <ListItemText primary="Filter Candidates" />
    </ListItemButton>
    </Link>
    <Link to="/admin/dash/candidatestests" style={{ textDecoration: 'none', color: 'inherit' }}>
    <ListItemButton>
      <ListItemIcon>
      <DocumentScannerIcon />
      </ListItemIcon>
      <ListItemText primary="User Tests" />
    </ListItemButton>
    </Link>
    <ListItemButton onClick={handleLogout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>

  </React.Fragment>
  );
};

export default MainListItems;




