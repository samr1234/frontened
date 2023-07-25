import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import Pdp from './Pdp';
import Apti from './Apti'
import Technical from './Technical'
import NewAnalyticsReport from './NewAnalyticsReportTable';
import Total from "./Total";

const NewAnal = () => {
  const [selectedGraph, setSelectedGraph] = useState("total");
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchDates = async () => {
      try {
        const url = 'http://localhost:3001/getSingleData';
        const response = await axios.get(url);
        const datesData = response.data.map(date => {
          const dateObject = new Date(date.Date);
          const formattedDate = dateObject.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
          return formattedDate;
        });
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

  const handleGraphSelect = (graphType) => {
    setSelectedGraph(graphType);
  };
console.log("selected graph::::::",selectedGraph)
  return (
    <div>
      <select
        className="ml-4"
        style={{ marginTop: '3rem' }}
        id="dateSelect"
        value={selectedDate}
        onChange={handleDateChange}
      >
        <option value="">Select a date</option>
        {dates.map((date, index) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </select>

      <div style={{ position: "absolute", top: "30px", right: "90px" }}>
        
        <Dropdown onSelect={handleGraphSelect}>
          <Dropdown.Toggle variant="white" id="graphSelectionDropdown">
            {selectedGraph}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="total" active={selectedGraph === "total"}>
              Total Marks
            </Dropdown.Item>
            <Dropdown.Item eventKey="apti" active={selectedGraph === "apti"}>
              Apti Marks
            </Dropdown.Item>
            <Dropdown.Item eventKey="pdp" active={selectedGraph === "pdp"}>
              Pdp Marks
            </Dropdown.Item>
            <Dropdown.Item eventKey="technical" active={selectedGraph === "technical"}>
             Technical Marks
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div>
      
        <div>
         
          {selectedGraph === "total" && (
            <div
              style={{
                position: "relative",
                top: "50%",
                transform: "translateY(10%)",
              }}
            >
              <div className="">
              <Total />
              </div>
              <NewAnalyticsReport data={data} selectedGraph={selectedGraph}/>
            </div>
          )}
          {selectedGraph === "apti" && (
            <div
              style={{
                position: "relative",
                top: "50%",
                transform: "translateY(10%)",
              }}
            >
               <div className="">
              <Apti />
              </div>
              <NewAnalyticsReport data={data} selectedGraph={selectedGraph}/>
          
            </div>
          )}
          {selectedGraph === "pdp" && (
            <div
              style={{
                position: "relative",
                top: "50%",
                transform: "translateY(10%)",
              }}
            >
               <div className="">
              <Pdp />
              </div>
              <NewAnalyticsReport data={data} selectedGraph={selectedGraph}/>
          
            </div>
          )}
          {selectedGraph === "technical" && (
            <div
              style={{
                position: "relative",
                top: "50%",
                transform: "translateY(10%)",
              }}
            >
               <div className="">
              <Technical />
              </div>
              <NewAnalyticsReport data={data} selectedGraph={selectedGraph}/>
          
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default NewAnal;