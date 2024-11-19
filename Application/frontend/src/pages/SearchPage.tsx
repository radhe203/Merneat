import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { searchform } from "@/components/SearchBar";
import SearchResultCards from "@/components/SearchResultCards";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropDown from "@/components/SortOptionDropDown";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { hideHero } from "@/redux/slices/userSlice";
import { RestaurantType } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type resultType = {
  data: [RestaurantType];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type searchStateType = {
  searchQuery: string;
  page: number;
  selectedCuisine: string[];
  sortOption: string;
};

const SearchPage = () => {
  const [searchState, setSearchState] = useState<searchStateType>({
    searchQuery: "",
    page: 1,
    selectedCuisine: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { baseUrl } = useAppSelector((state) => state.User);
  const [results, setResults] = useState<resultType>();
  useEffect(() => {
    dispatch(hideHero());
  }, []);

  const city = useParams().searchQuery;

  async function searchRestaurants(city: string, searchState?: any) {
    const params = new URLSearchParams();

    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisine.join(","));
    params.set("sortOptions", searchState.sortOption);

    try {
      const res = await fetch(
        `${baseUrl}/api/search/${city}?${params.toString()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setResults(data);
      }
    } catch (error: any) {
      toast.error(error.message);
      throw new Error(error);
    }
  }

  useEffect(() => {
    if (city) {
      searchRestaurants(city, searchState);
    }
  }, [searchState]);

  if (!results?.data || !city) {
    return <span>No result Found</span>;
  }

  function setSearchQuery(searchFormData: searchform) {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
    }));
  }

  function resetSearch() {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1,
      selectedCuisine: [],
    }));
  }

  function setPage(page: number) {
    setSearchState((prev) => ({
      ...prev,
      page,
    }));
  }

  function setSelectedCuisine(selectedCuisine: string[]) {
    setSearchState((prev) => ({
      ...prev,
      selectedCuisine,
      page: 1,
    }));
  }

  function setSortOption(sortOption: string) {
    setSearchState((prev) => ({
      ...prev,
      page: 1,
      sortOption,
    }));
  }

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines_list">
        <CuisineFilter
          onChange={setSelectedCuisine}
          isExpanded={isExpanded}
          selectedCuisine={searchState.selectedCuisine}
          onExpendedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>

      <div id="main_content" className=" flex flex-col gap-5">
        <SearchBar
          onSubmit={setSearchQuery}
          searchQuery={searchState.searchQuery}
          onReset={resetSearch}
          placeholder="Search by cuisine name or Restaurant name"
        />

        <div className=" flex justify-between flex-col lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropDown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {results.data.map((restaurant, index) => {
          return <SearchResultCards key={index} restaurant={restaurant} />;
        })}

        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
