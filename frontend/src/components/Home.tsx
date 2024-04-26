import landing from "../assets/landing.png";
import appDownload from "../assets/appDownload.png";
const Home = () => {
  return (
    <div className=" flex flex-col gap-12">
      <div className=" bg-white shadow-md rounded-lg py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className=" text-5xl text-orange-600 tracking-tight font-bold">
          Truck into a takeway today
        </h1>
        <span className=" text-xl">Food is just click away</span>
        
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
