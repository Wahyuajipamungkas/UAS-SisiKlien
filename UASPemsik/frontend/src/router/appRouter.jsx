import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Addbencana from "../pages/addbencana";
import Login from "../pages/Login";
import Registrasi from "../pages/Registrasi";
import ListBencana from "../pages/listbencana";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/register",
        element: <Registrasi />
    },
    {
        path: "/dasboard",
        element: <Dashboard />
    },
    {
        path: "/addbencana",
        element: <Addbencana />
    },
    {
        path: "/listbencana",
        element: <ListBencana />

    },
])

export default router;