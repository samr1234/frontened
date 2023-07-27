import React, { useState } from 'react';
import ProfileIcon from '@mui/icons-material/AccountCircle'; // Replace 'Profile' with the correct icon name
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, you can call an API to logout the user and then handle the logout action
    // After that, close the popover
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'profile-popover' : undefined;

  return (
    <div>
      <div onClick={handleOpen} style={{ cursor: 'pointer' }}>
        <ProfileIcon />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className="p-4">
          <p className="text-center text-xl">Logout</p>
          <p className="text-center">Are you sure you want to logout?</p>
          <div className="flex justify-center mt-4">
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default Profile;
