import React from 'react'
import Sidebar from "./scenes/global/Sidebar";
import {Outlet} from 'react-router-dom'
import Navigation from './scenes/Nav/Navigation';
const Layout = () => {
  return (
    <>
  
    <div className="flex">

 <Sidebar />
 <Outlet className=""/>
    </div>
    </>
  )
}

export default Layout