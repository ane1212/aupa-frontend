import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardHome, DashboardUsers, DashboardLocals, DashboardEvents, DashboardCategories, DashboardPreferences, Experiences, Home, Login, Nearby, Profile, Register, Saved, Detail, NearbyDetail, LocalPartner, ErrorPage, DashboardLogin, Onboarding, MapView, LocalHome, LocalListing, LocalCreateEvent, LocalExperiences, LocalProfile, LocalDetail } from "../pages";
import Root from "../components/layout/Root";
import AuthLayout from "../components/layout/Auth";
import DashboardLayout from "../components/layout/DashboardLayout";
import AuthenticatedRoute from "../components/layout/AuthenticatedRoute";
import SuperAdminRoute from "../components/layout/SuperAdminRoute";
import LocalLayout from "../components/layout/LocalLayout";
import LocalRoute from "../components/layout/LocalRoute";

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
    path: "/nearby-detail",
    element: <NearbyDetail />,
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
    path: "/local",
    element: (
      <LocalRoute>
        <LocalLayout />
      </LocalRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/local/home" /> },
      { path: "home", element: <LocalHome /> },
      { path: "listing", element: <LocalListing /> },
      { path: "create", element: <LocalCreateEvent /> },
      { path: "edit/:id", element: <LocalCreateEvent /> },
      { path: "experiences", element: <LocalExperiences /> },
      { path: "profile", element: <LocalProfile /> },
      { path: "detail/:id", element: <LocalDetail /> },
    ],
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
