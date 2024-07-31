import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./redux/hooks/hooks";

const ProtectedRoutes = () => {
  const { userId, username, email } = useAppSelector((state) => state.User);
  return (
    <>{username && email && userId ? <Outlet /> : <Navigate to={"/"} />}</>
  );
};

export default ProtectedRoutes;
