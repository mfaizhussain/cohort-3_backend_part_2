import Profile from "../modules/auth/page/Profile";
import Register from "../modules/auth/page/Register";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
    {
        path:"/register",
        element: <Register />
    },
    {
        path:"/profile",
        element: <Profile />
    }
])

export default router;