import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardHome, DashboardUsers, DashboardLocals, DashboardEvents, DashboardCategories, DashboardPreferences, Experiences, Home, Login, Nearby, Profile, Register, Saved, Detail, LocalPartner, ErrorPage, DashboardLogin, Onboarding, MapView } from "../pages";
import Root from "../components/layout/Root";
import AuthLayout from "../components/layout/Auth";
import DashboardLayout from "../components/layout/DashboardLayout";
import AuthenticatedRoute from "../components/layout/AuthenticatedRoute";
import SuperAdminRoute from "../components/layout/SuperAdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
    path: "/local-partner",
    element: <LocalPartner />,
  },
  {
    path: "/map",
    element: <MapView />,
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "onboarding", element: <AuthenticatedRoute><Onboarding /></AuthenticatedRoute> },
    ],
  },
  {
    path: "/dashboard",
    children: [
      { index: true, element: <DashboardLogin /> },
      {
        element: (
          <SuperAdminRoute>
            <DashboardLayout />
          </SuperAdminRoute>
        ),
        children: [
          { path: "home", element: <DashboardHome /> },
          { path: "users", element: <DashboardUsers /> },
          { path: "locals", element: <DashboardLocals /> },
          { path: "events", element: <DashboardEvents /> },
          { path: "categories", element: <DashboardCategories /> },
          { path: "preferences", element: <DashboardPreferences /> },
        ],
      }
    ]
  }

]);

export default router;
