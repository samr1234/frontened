import React from 'react';
import Notifications from './Notifications';
import Profile from './Profile';

const Navigation = () => {
  return (
    <div className="flex items-center justify-end">
      <div className="icon-container cursor-pointer p-2 ml-56 ">
        <Notifications />
      </div>
      <div className="icon-container cursor-pointer p-2">
        <Profile />
      </div>
    </div>
  );
};

export default Navigation;
