import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Apti from '../scenes/analytics/Apti';

const Aptiscorecard = () => {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('Date: 2021-06-01');

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const url = 'http://localhost:3001/getSingleData'; // Replace with your endpoint to fetch 
        const response = await axios.get(url);
        const datesData = response.data.map(date => {
          const dateObject = new Date(date.Date);
          const formattedDate = dateObject.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
          return formattedDate;
        });
        console.log("testshare::::", datesData);
        setDates(datesData);
      } catch (error) {
        console.error('Error fetching dates:', error);
      }
    };

    fetchDates();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedDate) {
          const url = 'http://localhost:3001/getDateData';
          const response = await axios.get(url, {
            params: {
              date: selectedDate,
            },
          });
          const data = response.data;
          console.log("testshare::::", data);
          setData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [selectedDate]);



  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);

  };

  return (
    <>
      <select className="ml-4" style={{ marginTop: '3rem' }} id="dateSelect" value={selectedDate} onChange={handleDateChange}>
      <option value="">Select a date</option>
        {dates.map((date, index) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </select>
      <div className="flex justify-between mt-10 ml-4">
        {data && data.map((data) => (
          <div className="rounded text-2xl bg-white p-3" style={{ flex: '1', marginRight: '1rem' }}>
            <div className="text py-2">
              <p>
                Attempted On <span>{selectedDate}</span></p>
              <p>
                Total Time <span>{data.aptitime}</span>
              </p>
              <p>
                Time Taken <span>{data.TotalTimeTaken}</span>
              </p>

              <p>
                Total Questions <span>{data.TotalQuestion}</span>
              </p>
              <p>
                Correct Questions <span>{data.Apticorrect}</span>
              </p>
              <p>
                Incorrect Questions <span>{data.aptiincorrect}</span>
              </p>
              <p>
                Skipped <span>{data.Skipped}</span>
              </p>
              <p>
                Marks Obtained <span>{data.Total_Marks_obt}</span>
              </p>
            
             
              
             
              <p>
                Total Percentage <span>{data.Overall_Prec.toFixed(2)}</span>
              </p>
            </div>
          </div>
        ))}
        <div className="Agraph" style={{ flex: '1', marginRight: '2rem' }}>
          <Apti />
        </div>
      </div>
    </>
  );
};

export default Aptiscorecard
