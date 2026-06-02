import { createBrowserRouter, Navigate } from "react-router-dom";
import { Error, Experiences, Home, Login, Nearby, Profile, Register, Saved } from "../pages";
import Root from "../components/layout/Root";
import AuthLayout from "../components/layout/Auth";

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
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export default router;