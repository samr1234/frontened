import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../UserContext.jsx";
import { Navigate, Link, useParams } from "react-router-dom";
import NewAnalytics from './NewAnalytics'




const Analytics = () => {


  const { loading, user, setUser } = useContext(UserContext);


  if (!user && !loading) {
    // Redirect the user to the login page
    return <Navigate to={"/login"} />;
  }
  return (
    <>

    <NewAnalytics/>


    </>
    
  )
}

export default Analytics