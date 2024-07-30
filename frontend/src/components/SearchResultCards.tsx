import { restaurentType } from "@/configs/schema"
import { Link } from "react-router-dom"
import { AspectRatio } from "./ui/aspect-ratio"
import { Banknote, Clock, Dot } from "lucide-react"

type Props = {
    restaurant: restaurentType
}

const SearchResultCards = ({ restaurant }: Props) => {
    return (
        <Link to={`/detail/${restaurant}`} className="grid lg:grid-cols-[2fr_3fr] gap-5 group">
            <AspectRatio ratio={16 / 6}>
                <img src={restaurant.imageUrl} className=" rounded-md h-full w-full object-cover" />
            </AspectRatio>

            <div>
                <h3 className=" text-2xl font-bold tracking-tight mb-2 group-hover:underline">
                    {restaurant.restaurantName}
                </h3>

                <div id="cart-content" className="grid grid-cols-2 gap-2">
                    <div className="flex flex-row  flex-wrap ">
                        {restaurant.cuisines.map((cuisine, index) => (
                            <span key={index} className=" flex">
                                <span>{cuisine}</span>
                                {restaurant.cuisines.length - 1 > index && <Dot />}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-2 flex-col">
                        <div className=" flex items-center gap-1 text-green-600">
                            <Clock className="text-green-600" />
                            {restaurant.estimatedDeliveryTime} Delivery Price
                        </div>

                        <div className=" flex items-center gap-1">
                            <Banknote />
                            Delivery from ${restaurant.deliveryPrice}
                        </div>
                    </div>
                </div>
            </div>

        </Link>
    )
}

export default SearchResultCards