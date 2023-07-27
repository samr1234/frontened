import React, { useState } from "react";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const Profile = ({ onLogout, onChangePassword }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  const handleChangePassword = () => {
    onChangePassword();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className=" hover:bg-grey text-white font-bold py-2 px-6 rounded flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <PermIdentityIcon className="ml-96 bg-black" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg">
          <ul className="py-2">
            <li>
              <button
                className="block px-4  text-gray-800 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
            <li>
              <button
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;