import React from 'react';
import Notifications from './Notifications';
import Profile from './Profile';

const Navigation = () => {
  return (
    <div className="flex flex-row-reverse mr-3">
   
      <div className="icon-container cursor-pointer p-2  ">
        <Profile />
      </div>
      <div className="icon-container cursor-pointer p-2 ">
        <Notifications />
      </div>
    </div>
  );
};

export default Navigation;
