import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./components/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import RestrictedRoutes from "./RestrictedRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import UserProfileForm from "./forms/user-profileform/UserProfileForm";
import ProfilePage from "./pages/ProfilePage";

const Approutes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />} />
        <Route element={<RestrictedRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<ProfilePage/>}/>
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Approutes;
