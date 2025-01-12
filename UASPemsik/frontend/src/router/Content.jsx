import { createBrowserRouter } from "react-router-dom";
import InventoryList from "../components/databencana";
import AddBencanaForm from "../components/formpengisian";

const Content = createBrowserRouter([
    {
        path: "/",
        element: <InventoryList />
    },
    {
        path: "/addbencana",
        element: <AddBencanaForm />
    },
])

export default Content;