import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'

import Dashboard from "./scenes/dashboard";
import Analytics from "./scenes/analytics/Analytics";
import Report from "./scenes/report/Report";

// import Register from "./auth/Register";
import Login from './Login/Login.jsx'
import Layout from './Layout'

function App() {

  return (
    <div className="app min-w-screen">




      <Routes>
          <Route path='/login' element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path="/report" element={<Report />} />
        </Route>
      </Routes>

    </div>



  );
}

export default App;
