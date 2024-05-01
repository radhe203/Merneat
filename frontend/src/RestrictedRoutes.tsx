import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./redux/hooks/hooks";

const RestrictedRoutes = () => {
const { username, email, userId } = useAppSelector((state) => state.User);

// console.log(username)
// const username = ""

  return (

   <>
    {username && email && userId ? <Navigate to={'/'}/>:<Outlet/> }
   </>
    
  )
}

export default RestrictedRoutes