import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErroPage from "../pages/ErroPage";
import Blog from "../pages/Blog";
import Dashboard from "../pages/Dashboard";
import HeroSection from "../pages/HeroSection";
import SignupPage from "../components/Registration";
import LoginPage from "../components/Login";
import CreatePostPage from "../pages/CreatePost";
import ProtectedRoute from "../hooks/UserProtected";
import UserProfile from "../pages/UserProfile";
import UserSettings from "../pages/UserSetting";
import EmailVerification from "../pages/VerifyEmail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErroPage />,
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute />,
        children: [
          {
            path: "", // index: true
            element: <Dashboard />,
          },
        ],
      },

      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/create-post",
        element: <ProtectedRoute />,
        children: [
          {
            path: "", // index: true
            element: <CreatePostPage />,
          },
        ],
      },
      {
        path: "/profile",
        element: <ProtectedRoute />,
        children: [
          {
            path: "", // index: true
            element: <UserProfile />,
          },
        ],
      },
      {
        path: "/settings",
        element: <ProtectedRoute />,
        children: [
          {
            path: "", // index: true
            element: <UserSettings />,
          },
        ],
      },
      {
        path: "/verify-email",
        element: <EmailVerification />
      },
    ],
  },
]);

export default router;
