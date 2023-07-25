import React from 'react';
import './Slider.css';

const RangeSlider = ({ data }) => {
  const formatDate = (dateString) => {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const formatPercentage = (percentage) => {
    return parseFloat(percentage).toFixed(2);
  };

  return (
    <div className="container mx-auto my-auto py-2 px-2 bg-[#E7F1FA]">
      <div className="form-group " style={{ width: '100%', height: 'auto' ,fontFamily: 'Poppins'}}>
        <span className="font-bold" style={{ fontWeight: "bold" }}>Date: {formatDate(data.Date)}</span>
      
        <label htmlFor={`rangeSlider-${data.id}-1`} style={{ marginTop: "10px" }}>Technical</label>
        <div style={{color:"green"}}>
        <input
          type="range"
          className="form-control-range "
          id={`rangeSlider-${data.id}-1`}
          value={data.Tech_Prec}
          max={100}
        
          title={`${formatPercentage(data.Tech_Prec)}%`}
        />
        </div>
        <span style={{ fontWeight: "bold", float: "right" }}>
         
          { data.Tech_Prec &&  formatPercentage(data?.Tech_Prec)}%</span>

        <label htmlFor={`rangeSlider-${data.id}-2`}>Aptitude</label>
        <input
          type="range"
          className="form-control-range"
          id={`rangeSlider-${data.id}-2`}
          value={data.Apti_Prec}
          max={100}
          title={`${formatPercentage(data.Apti_Prec)}%`}
        />
        <span style={{ fontWeight: "bold", float: "right" }}>{formatPercentage(data.Apti_Prec)}%</span>

        <label htmlFor={`rangeSlider-${data.id}-3`}>English</label>
        <input
          type="range"
          className="form-control-range"
          id={`rangeSlider-${data.id}-3`}
          value={data.English_Prec}
          max={100}
          title={`${formatPercentage(data.English_Prec)}%`}
        ></input>
        <span style={{ fontWeight: "bold", float: "right" }}>{formatPercentage(data.English_Prec)}%</span>
      </div>
    </div>
  );
};

export default RangeSlider;