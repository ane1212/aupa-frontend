import { createBrowserRouter, Navigate } from "react-router-dom";
import { Detail, Error, Experiences, Home, Login, Nearby, Profile, Register, Saved } from "../pages";
import Root from "../components/layout/Root";
import AuthLayout from "../components/layout/Auth";
import AuthenticatedRoute from "../components/layout/AuthenticatedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to="/home" /> },
      { path: "home", element: <Home /> },
      { path: "nearby", element: <Nearby /> },
      { 
        path: "experiences", 
        element: (
          <AuthenticatedRoute>
            <Experiences />
          </AuthenticatedRoute>
        ) 
      },
      { 
        path: "saved", 
        element: (
          <AuthenticatedRoute>
            <Saved />
          </AuthenticatedRoute>
        ) 
      },
      { 
        path: "profile", 
        element: (
          <AuthenticatedRoute>
            <Profile />
          </AuthenticatedRoute>
        ) 
      },
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
]);

export default router;