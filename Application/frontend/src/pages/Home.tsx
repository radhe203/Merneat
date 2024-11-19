import landing from "../assets/landing.png";
import appDownload from "../assets/appDownload.png";
import { showHero } from "@/redux/slices/userSlice";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks/hooks";
import SearchBar, { searchform } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(showHero());
  }, []);

  function handelSubmit(searchform: searchform) {
    navigate({
      pathname: `/search/${searchform.searchQuery}`,
    });
  }

  return (
    <div className=" flex flex-col gap-12">
      <div className="md:px-32 bg-white shadow-md rounded-lg py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className=" text-5xl text-orange-600 tracking-tight font-bold">
          Truck into a takeway today
        </h1>
        <span className=" text-xl">Food is just click away</span>
        <SearchBar
          placeholder="search by city or town"
          onSubmit={handelSubmit}
        />
      </div>
      <div className=" grid  md:grid-cols-2 gap-5">
        <img src={landing} />
        <div className=" flex flex-col justify-center items-center  text-center gap-4">
          <span className=" font-bold text-3xl tracking-tighter">
            Oder takeway even faster!
          </span>
          <span>
            Download the Merneats App for fast odering and pertionalized
            recommendations and
          </span>
          <img src={appDownload} />
        </div>
      </div>
    </div>
  );
};

export default Home;
