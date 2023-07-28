import React from 'react'
import Sidebar from "./scenes/global/Sidebar";
import {Outlet} from 'react-router-dom'
import Navigation from './scenes/Nav/Navigation';
const Layout = () => {
  return (
    <>
  
    <div className="flex">

    {/* <Navigation className="block"/> */}
 <Sidebar />

 <Outlet className=""/>
    </div>
    </>
  )
}

export default Layout