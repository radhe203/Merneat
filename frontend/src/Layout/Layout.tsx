import { Outlet } from "react-router-dom";
// import Home from "../components/Home";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
// type props = {
//   children: React.ReactNode;
// }
function Layout() {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Header/>
      <Hero/>
      <div className="container mx-auto flex-1 py-10">
        <Outlet/>
      </div>
    </div>
    </>
  );
}

export default Layout;
