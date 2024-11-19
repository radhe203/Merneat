import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="flex text-xl font-bold flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Restaurants Found in {city}
        <Link
          to={"/"}
          className=" ml-1 text-blue-500 text-sm underline cursor-pointer font-semibold"
        >
          change location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
