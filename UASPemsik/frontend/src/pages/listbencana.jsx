import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Contentt from "../components/listBencana";

const ListBencana = () => {
    return(
        
        <div className=" min-h-screen  border-red-200">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ">
            <Header />
            <div className="p-5 bg-gray-100 h-full">
             <Contentt />
            </div>
          </div>
        </div>
      </div>
    )
}

export default ListBencana;