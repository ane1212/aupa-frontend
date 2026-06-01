import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Error, Experiences, Home, Login, Nearby, Profile, Register, Saved } from '../pages';
import Root from '../components/layout/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to="/home" /> },
      { path: 'home', element: <Home /> },
      { path: 'nearby', element: <Nearby /> },
      { path: 'experiences', element: <Experiences /> },
      { path: 'saved', element: <Saved /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
]);

export default router;