import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './components/Home'

const Approutes = () => {
    const router = createBrowserRouter (
        createRoutesFromElements(
            <Route path='/' element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path='/user-profile' element={<div>User profile page</div>}/>
                <Route path='*' element={<Navigate to={'/'}/>}/>
            </Route>
        )
    )
  return (
    <RouterProvider router={router}/>
  )
}

export default Approutes