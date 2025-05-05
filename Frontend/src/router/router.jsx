import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErroPage from "../pages/ErroPage";
import Blog from "../pages/Blog";
import Login from "../components/Login";
import Dashboard from "../pages/Dashboard";
import Registration from "../components/Registration";
import ProtectedRoute from "../Route/ProtectedRoute";
import ForgotPassword from "../pages/Forgote";
// import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErroPage />,
        children: [
            {
                path: "/",
                element: <Blog />,
            },
            {
                path: "blog",
                element: <Blog />,
            },
            {
                path: "dashboard",
                // element: (
                //     <ProtectedRoute>
                //         <Dashboard />
                //     </ProtectedRoute>
                // ),
                element: <Dashboard />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Registration />,
            },
            {
                path: "forgetPassword",
                element: <ForgotPassword />,
            },
        ],
    },
]);

export default router;
