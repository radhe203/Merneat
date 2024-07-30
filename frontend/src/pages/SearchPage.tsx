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

const SearchPage = () => {

    const dispatch = useAppDispatch()
    const { baseUrl } = useAppSelector(state => state.User)
    const [results, setResults] = useState<resultType>()
    useEffect(() => {
        dispatch(hideHero())
    }, [])

    const city = useParams().searchQuery


    async function searchRestaurants(searchTerm: string) {

        try {
            const res = await fetch(`${baseUrl}/api/search/${searchTerm}`, {
                method: "GET",
                credentials: "include"

            })

            const data = await res.json()


            if (res.ok) {
                setResults(data)
                console.log(results)
            }

        } catch (error: any) {
            toast.error(error.message)
            throw new Error(error)
        }

    }

    useEffect(() => {
        if (city) {
            searchRestaurants(city as string)
        }
    }, [])


    if (!results?.data || !city) {
        return <span>No result Found</span>
    }

    return (
        <div className=" grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">


            <div id="cuisines_list">
                insert cusines here
            </div>

            <div id="main_content" className=" flex flex-col gap-5">
                <SearchResultInfo total={results.pagination.total} city={city} />
                {
                    results.data.map((restaurant,index) => {
                        return (

                            <SearchResultCards key={index} restaurant={restaurant}/>
    
)
                    })
                }
            </div>
        </div>
    )
}

export default SearchPage