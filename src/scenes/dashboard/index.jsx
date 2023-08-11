import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import MyCarousel from "../global/Slider2";
import Navigation from "../Nav/Navigation";
import TopSection from "./TopSection";
import Notifications from "./Notifications";
import { UserContext } from "../../UserContext.jsx";

import { Navigate, Link, useParams } from "react-router-dom";
const Dashboard = () => {
  const [data1, setData1] = useState([]);
  const [latestDataDate, setLatestDataDate] = useState(null);
  
  const { loading, user, setUser,isLoading,setIsLoading } = useContext(UserContext);
  console.log("user:::::", user);

  const fetchData1 = async () => {
    const url = "/getSingleData";

    try {
      const response = await axios.get(url);
      const sortedData = response.data.sort(
        (a, b) => new Date(b.Date) - new Date(a.Date)
      );
      setData1(sortedData);
      console.log("Data1:::::::",data1)

      // Get the latest date from the fetched data and set it to the state
      if (sortedData.length > 0) {
        setLatestDataDate(sortedData[0].Date);
      }
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

 

  useEffect(() => {
    fetchData1();
    // if(!user){
    //   setIsLoading(false)
    // }
  }, []);



// console.log()
if (loading) {
   return <Navigate to={"/login"} />;
}

// Check if the user is not logged in and redirect to the login page
if (!user) {
  return <Navigate to={"/login"} />;
}


  // if ((!user  && !loading && !isLoading) ) {
  //   // Redirect the user to the login page
  
  //   return <Navigate to={"/login"} />;
  // }
  
  

 

  const formatCustomDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString)
      .toLocaleString(undefined, options)
      .replace(/(\d+:\d+)(\s\w+)/, "$1$2");
  };


  return (
    <div className="w-full" style={{ backgroundColor: "white" }}>
      <div className="col main pt-5 mt-3 container px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <p className=" text-2xl mb-2 sm:mb-0">Welcome to your Dashboard</p>
        
        </div>
          <Navigation className=""/>

        <p className="flex flex-row-reverse text-2xl mr-5 my-2 font-bold">
          {formatCustomDate(latestDataDate)}
        </p>

        <TopSection data1={data1} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="w-full mb-6">
            <div className="card w-full">
              <div className="card-header">
                <h2>
                  <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>{" "}
                  Test Information
                </h2>
              </div>
              <div className="card-body">
                <div className="carousel-wrapper">
                  <MyCarousel isLoading={isLoading}/>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
