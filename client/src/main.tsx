import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Authentication from './pages/Authentication.tsx'
import Home from './pages/Home.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'
import SignUp from './components/SignUp.tsx'
import SignIn from './components/SignIn.tsx'
import AllMedia from './pages/AllMedia.tsx'
import MediaDetails from './pages/MediaDetails.tsx'
import AuthProtector from './components/AuthProtector.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        element: <AuthProtector><Home/></AuthProtector>
      },
      {
        path: 'dashboard',
        element: <AuthProtector><AdminDashboard/></AuthProtector>,
        children: [
          {
            index: true,
            element: <AllMedia />
          },
          {
            path: 'media/:id',
            element: <MediaDetails/>
          }
        ]
      },
      {
        path: 'auth',
        element: <AuthProtector><Authentication/></AuthProtector>,
        children: [
          {
            path: 'signup',
            element: <SignUp/>
          },
          {
            path: 'signin',
            element: <SignIn/>
          }
        ]
      },

    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
