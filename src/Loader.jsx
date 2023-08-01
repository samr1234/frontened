import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <img
        src="https://hopingminds.com/wp-content/uploads/2023/01/Asset-5.png"
        alt="Hoping Minds"
        className="logo1"
        style={{ height: "54px", width: "150px" }}
      />
      
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;