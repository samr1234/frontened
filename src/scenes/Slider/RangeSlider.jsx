import React from 'react';
import './Slider.css';

function formatDate(dateString) {
  const dateObj = new Date(dateString);
  
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  
  return `${day}/${month}/${year}`;
}

const RangeSlider = ({ data }) => {
  console.log("data::::::::::", data)
  const dataArray = Object.entries(data);
  console.log("slider::::::::::", dataArray)
  
  if (dataArray.length === 0) {
    return null; // Return null if dataArray is empty
  }

  const [key, value] = dataArray[16]; // Access the 15th entry of dataArray
  const formattedDate = formatDate(value); // Format the date value

  return (
    <div className="container">
      <div key={key}>
        <h6>{key}: {formattedDate}</h6>
        <div className="form-group" style={{ width: '100%', height: 'auto' }}>
          <label htmlFor="rangeSlider">Technical</label>
          <input type="range" className="form-control-range" id="rangeSlider" value={70} /><br />
          <label htmlFor="rangeSlider">Apptitude</label>
          <input type="range" className="form-control-range" id="rangeSlider" value={30} /><br />
          <label htmlFor="rangeSlider">Communication</label>
          <input type="range" className="form-control-range" id="rangeSlider" value={50} />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
