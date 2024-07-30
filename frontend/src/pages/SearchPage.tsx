import { useAppDispatch} from "@/redux/hooks/hooks"
import { hideHero } from "@/redux/slices/userSlice"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const SearchPage = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(hideHero())
    }, [])

    const searchQuery = useParams().searchQuery
    return (
        <div>
            <p>{searchQuery}</p>
        </div>
    )
}

export default SearchPage