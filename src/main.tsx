import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
import router from './routes/router';
import './assets/styles/index.css'

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('#root element was not found');
}
createRoot(rootElement).render(
 // <AuthProvider>
    <RouterProvider router={router} />
 // </AuthProvider>
);
