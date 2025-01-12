import React from "react";
import { Router } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import InventoryList from "../components/databencana";
import Content from "../router/Content";

const Dashboard = () => {
    return(
        
        <div className=" min-h-screen  border-red-200">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ">
            <Header />
            <div className="p-5 bg-gray-100 h-full">
             <InventoryList />
            </div>
          </div>
        </div>
      </div>
    )
}

export default Dashboard;