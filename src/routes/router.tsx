import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardUsers, Error, Experiences, Home, Login, Nearby, Profile, Register, Saved, Detail } from "../pages";
import Root from "../components/layout/Root";
import AuthLayout from "../components/layout/Auth";
import DashboardLayout from "../components/layout/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to="/home" /> },
      { path: "home", element: <Home /> },
      { path: "nearby", element: <Nearby /> },
      { path: "experiences", element: <Experiences /> },
      { path: "saved", element: <Saved /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard/users" /> },
      // { path: "locals", element: <DashboardLocals /> },
      { path: "users", element: <DashboardUsers /> },
    ],
  }

]);

export default router;
