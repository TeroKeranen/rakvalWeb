import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import {
   About,
  Company,
  Worksites,
  AddWorksite,
  Landing,
  Login,
  Register,
  HomeLayout,
  Error,
  SingleWorksite
  } from './pages'
import { ErrorElement } from './components'


//loaders
import {loader as landingLoader} from './pages/Landing'



//actions
import {action as registerAction} from './pages/Register'
import {action as loginAction} from './pages/Login'
import {action as verifyAction} from './pages/Verification'

import { store } from './store'
import ProtectedRoute from './components/ProtectedRoute'
import Verification from './pages/Verification'




const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement:<Error />,
    children: [
      {
        index:true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader
      },
      {
        path:'worksites',
        element: (
          <ProtectedRoute>
            <Worksites />
          </ProtectedRoute>
        )
      },
      {
        path:'worksites/:id',
        element:(
          <ProtectedRoute>     
            <SingleWorksite />
          </ProtectedRoute>
        )
      },
      {
        path:'company',
        element: (
          <ProtectedRoute>
            <Company />
          </ProtectedRoute>
        ),
        
      },
      {
        path:'about',
        element: <About />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
    errorElement:<Error />,
    action: loginAction(store)
  },
  {
    path: '/register',
    element: <Register />,
    errorElement:<Error />,
    action: registerAction
  },
  {
  path: '/verifycode',
  element: <Verification />,
  errorElement: <Error />,
  action: verifyAction(store)
  }
])

function App() {
  
  return (
    <>
    <ToastContainer/>
    <RouterProvider router={router}>

    </RouterProvider>
    </>
  )
}

export default App
