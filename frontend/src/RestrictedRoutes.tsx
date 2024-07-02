import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./redux/hooks/hooks";

const RestrictedRoutes = () => {
const { username, email, userId } = useAppSelector((state) => state.User);


  return (

   <>
    {username && email && userId ? <Navigate to={'/'}/>:<Outlet/> }
   </>
    
  )
}

export default RestrictedRoutes