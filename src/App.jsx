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
  SingleWorksite,
  Profile,
  Changepassword
  
  } from './pages'
  import { store } from './store'
import { ErrorElement } from './components'


//loaders




//actions
import {action as registerAction} from './pages/Register'
import {action as loginAction} from './pages/Login'
import {action as verifyAction} from './pages/Verification'
// import {action as addworksiteAction} from './pages/AddWorksite'

import ProtectedRoute from './components/ProtectedRoute'
import Verification from './pages/Verification'





const router = createBrowserRouter([
  {
    path: '/',
    element: (
    <HomeLayout />
    ),
    errorElement:<Error />,
    children: [
      {
        index:true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        
      },
      {
        path:'worksites',
        element: (
          <ProtectedRoute>
            <Worksites />
          </ProtectedRoute>
        ),
        
      },
      {
        path:'worksites/:id',
        element:(
          <ProtectedRoute>     
            <SingleWorksite />
          </ProtectedRoute>
        ),
        
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
        path:'addworksite',
        element:(
          <ProtectedRoute>
            <AddWorksite />
          </ProtectedRoute>
        ),
        // action: addworksiteAction
      },
      {
        path:'about',
        element: <About/>
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
      )
      },     
      {
        path: 'changepassword',
        element: (
          <ProtectedRoute>
            <Changepassword />
          </ProtectedRoute>
        )
      }
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
