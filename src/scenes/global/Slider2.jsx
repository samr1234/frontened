import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Range-slider.css';
import RangeSlider from '../Slider/RangeSlider';

const MyCarousel = () => {
  const [data1, setData1] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:3001/getSingleData';
        const response = await axios.get(url);
        const data = response.data;
        console.log("testshare", data);
        setData1(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="carouselExampleControls" className="carousel carousel-dark slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {data1.map((data, index) => (
          <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
            <div className="card-wrapper container-sm d-flex justify-content-around">
              <div className="card" style={{ width: '16rem', height: '13rem', padding: '1rem', marginRight: '1rem' }}>
                <RangeSlider data={data} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev custom-prev-btn" style={{ backgroundColor: 'gray', color: 'white' }} type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next custom-next-btn" style={{ backgroundColor: 'gray', color: 'white' }} type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default MyCarousel;
