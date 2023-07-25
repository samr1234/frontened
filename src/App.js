import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Analytics from "./scenes/analytics/Analytics";
import Report from "./scenes/report/Report";
import Navigation from './scenes/nav/Navigation';
// import Register from "./auth/Register";
import Login from './Login/Login.jsx'


function App() {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
        <div className="app">
        <Navigation setIsSidebar={setIsSidebar} />
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Routes>
       
              <Route path="/" element={<Dashboard />} />

              <Route path='/login' element={<Login/>} />
              <Route path='/analytics' element={<Analytics/>} />
              <Route path="/report" element={<Report/>}/>
            </Routes>
          </main>
          
        </div>
       
     
    
  );
}

export default App;
