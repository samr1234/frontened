import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../UserContext.jsx";

import NewAnalytics from './NewAnalytics'
import { Navigate, Link, useParams } from "react-router-dom";

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