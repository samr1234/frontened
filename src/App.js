import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import { UserContextProvider } from "./UserContext";
import Dashboard from "./scenes/dashboard";
import Analytics from "./scenes/analytics/Analytics";
import Report from "./scenes/report/Report";

// import Register from "./auth/Register";
import Login from './Login/Login.jsx'
import Layout from './Layout'
import Notifications from "./notification";
import axios from 'axios'
// data is going to be sent to the server at port 3000
axios.defaults.baseURL = "https://www.apistudentpanel.hopingminds.tech";
// axios.defaults.baseURL = "http://localhost:3001";

axios.defaults.withCredentials = true;

function App() {

  return (
    <div className="app min-w-screen">
 <UserContextProvider>
      <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/notification' element={<Notifications />} />

          {/* <Route path="/report" element={<Report />} /> */}
        </Route>
      </Routes>

 </UserContextProvider>

    </div>
  );
}

export default App;
