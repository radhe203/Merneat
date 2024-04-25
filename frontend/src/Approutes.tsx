import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from './App'
import Home from './components/Home'

const Approutes = () => {
    const router = createBrowserRouter (
        createRoutesFromElements(
            <Route path='/' element={<App/>}>
                <Route index element={<Home/>}/>
            </Route>
        )
    )
  return (
    <RouterProvider router={router}/>
  )
}

export default Approutes