import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Range-slider.css';
import RangeSlider from '../Slider/RangeSlider';
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const MyCarousel = () => {
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getSingleData");
      setTestData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="carouselExampleControls" className="carousel carousel-dark slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {loading ? (
          <div className="carousel-item active">
            {/* <div>Loading...</div> */}
          </div>
        ) : (
          testData.map((data, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="card-wrapper container-sm d-flex ">
                <div className="card mx-auto h-full w-96 pt-10" >
                  <RangeSlider data={data} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Conditionally render carousel control buttons */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <button className="carousel-control-prev my-10 mx-[-2rem] w-32" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="text-green-300">
              <NavigateBeforeIcon style={{ fontSize: '3rem' }} />
            </span>
          </button>

          <button className="carousel-control-next " type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="text-green-300" > <NavigateNextIcon style={{ fontSize: '3rem' }} /></span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCarousel;
