import { Outlet } from "react-router-dom";
// import Home from "../components/Home";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { useAppSelector } from "@/redux/hooks/hooks";

function Layout() {
  const {hero} = useAppSelector(state => state.User)
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Header/>
    {hero && <Hero/>}
      <div className="container mx-auto flex-1 py-10">
        <Outlet/>
      </div>
      <Footer/>
    </div>
    </>
  );
}

export default Layout;
