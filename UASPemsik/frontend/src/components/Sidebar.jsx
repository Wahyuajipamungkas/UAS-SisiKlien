import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    return(
        <aside className="w-63 bg-purple-900 min-h-screen text-white flex flex-col rounded-br-xl">
            <div className="sticky top-5">
            <div className="p-12">
                <h2 className="text-3xl font-bold ">Info Bencana</h2>
            </div>
            <nav className="flex flex-col gap-4 px-10">
                <a href="/dasboard" className="p-2 hover:bg-purple-950 px-5 py-2 rounded-lg transition font-sans">Dashboard</a>
                <a href="/listbencana" className="p-2 hover:bg-purple-950 px-5 py-2 rounded-lg transition font-sans">List Bencana</a>
                <a href="/addbencana" className="p-2 hover:bg-purple-950 px-5 py-2 rounded-md transition font-sans">Tambah Data</a>
                <button className="p-5 bg-purple-950 px-5 py-3 rounded-lg font-bold" onClick={() => navigate("/")}>Logout</button>
            </nav>
            </div>
        </aside>
    )
}

export default Sidebar;