import PaginationSelector from "@/components/PaginationSelector"
import SearchBar, { searchform } from "@/components/SearchBar"
import SearchResultCards from "@/components/SearchResultCards"
import SearchResultInfo from "@/components/SearchResultInfo"
import { restaurentType } from "@/configs/schema"
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks"
import { hideHero } from "@/redux/slices/userSlice"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"


type resultType = {
    data: [restaurentType]
    pagination: {
        total: number,
        page: number,
        pages: number
    }
}

export type searchStateType = {
    searchQuery: string,
    page:number
}


const SearchPage = () => {


    const [searchState, setSearchState] = useState<searchStateType>({
        searchQuery: "",
        page:1,
    })


    const dispatch = useAppDispatch()
    const { baseUrl } = useAppSelector(state => state.User)
    const [results, setResults] = useState<resultType>()
    console.log(results)
    useEffect(() => {
        dispatch(hideHero())
    }, [])

    const city = useParams().searchQuery


    async function searchRestaurants(city: string,searchState?:any) {

        const params = new URLSearchParams();

        params.set("searchQuery",searchState.searchQuery)
        params.set("page",searchState.page.toString())

        try {
            const res = await fetch(`${baseUrl}/api/search/${city}?${params.toString()}`, {
                method: "GET",
                credentials: "include"

            })

            const data = await res.json()


            if (res.ok) {
                setResults(data)
            }

        } catch (error: any) {
            toast.error(error.message)
            throw new Error(error)
        }

    }

    useEffect(() => {
        if (city) {
            searchRestaurants(city,searchState)
        }
    }, [searchState])


    if (!results?.data || !city) {
        return <span>No result Found</span>
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
            page:1
        }));
    }


    function setPage(page:number){
        setSearchState((prev) => ({
            ...prev,
            page
        }));
    }

    return (
        <div className=" grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">


            <div id="cuisines_list">
                insert cusines here
            </div>

            <div id="main_content" className=" flex flex-col gap-5">

                <SearchBar onSubmit={setSearchQuery} searchQuery={searchState.searchQuery} onReset={resetSearch} placeholder="Search by cuisine name or Restaurant name" />

                <SearchResultInfo total={results.pagination.total} city={city} />
                {
                    results.data.map((restaurant, index) => {
                        return (

                            <SearchResultCards key={index} restaurant={restaurant} />

                        )
                    })
                }

                <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage}/>
            </div>
        </div>
    )
}

export default SearchPage