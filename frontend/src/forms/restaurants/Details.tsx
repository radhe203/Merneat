import { restaurentType } from "@/configs/schema"
import { useFormContext } from "react-hook-form"

const Details = () => {
    const { register, formState: { errors } } = useFormContext<restaurentType>()
    return (
        <div className='space-y-2'>
            <div className=' pb-6'>
                <h3 className=' text-2xl font-semibold'>Details</h3>
                <p className=' text-sm text-slate-500'>Enter the Details About your Restaurants</p>
            </div>

            <div>
                <div className="mb-6">
                    <label>
                        <span className={`my-2 block  font-medium ${errors.restaurantName ? "text-red-500 focus:text-red-700" : "text-slate-600"}`}>Name</span>
                        <input className={`w-full bg-transparent p-4 border  rounded-md outline-none  focus:border-2 hover:border-slate-800 ${errors.restaurantName ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-slate-400 focus:border-blue-600"}`}  {...register("restaurantName")} />
                        {errors.restaurantName && <span className=" block mt-1 text-sm text-red-500 mx-1 ">{errors.restaurantName.message}</span>}
                    </label>

                </div>

                <div className="flex gap-6 mb-6 flex-col md:flex-row">
                    <div className=" w-full"><label>
                        <span className={`my-2 block  font-medium ${errors.city ? "text-red-500 focus:text-red-700" : "text-slate-600"}`}>City</span>
                        <input className={`w-full bg-transparent p-4 border  rounded-md outline-none  focus:border-2 hover:border-slate-800 ${errors.city ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-slate-400 focus:border-blue-600"}`}  {...register("city")} />
                        {errors.city && <span className=" block mt-1 text-sm text-red-500 mx-1 ">{errors.city.message}</span>}

                    </label></div>

                    <div className=" w-full">
                        <label>
                            <span className={`my-2 block  font-medium ${errors.country ? "text-red-500 focus:text-red-700" : "text-slate-600"}`}>Country</span>
                            <input className={`w-full bg-transparent p-4 border  rounded-md outline-none  focus:border-2 hover:border-slate-800 ${errors.country ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-slate-400 focus:border-blue-600"}`}  {...register("country")} />
                        {errors.country && <span className=" block mt-1 text-sm text-red-500 mx-1 ">{errors.country.message}</span>}

                        </label>
                    </div>
                </div>
                <div className=" mb-6 md:w-[300px]">
                    <label>
                        <span className={`my-2 block  font-medium ${errors.deliveryPrice ? "text-red-500 focus:text-red-700" : "text-slate-600"}`}>Delivery Price</span>
                        <input className={`w-full bg-transparent p-4 border  rounded-md outline-none  focus:border-2 hover:border-slate-800 ${errors.deliveryPrice ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-slate-400 focus:border-blue-600"}`}  {...register("deliveryPrice")} />
                        {errors.deliveryPrice && <span className=" block mt-1 text-sm text-red-500 mx-1 ">{errors.deliveryPrice.message}</span>}
     
                    </label>
                </div>

                <div className=" mb-6 md:w-[300px]">
                <label>
                        <span className={`my-2 block  font-medium ${errors.estimatedDeliveryTime ? "text-red-500 focus:text-red-700" : "text-slate-600"}`}>Estimated Delivery Time (Min)</span>
                        <input className={`w-full bg-transparent p-4 border  rounded-md outline-none  focus:border-2 hover:border-slate-800 ${errors.estimatedDeliveryTime ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-slate-400 focus:border-blue-600"}`}  {...register("estimatedDeliveryTime")} />
                        {errors.estimatedDeliveryTime && <span className=" block mt-1 text-sm text-red-500 mx-1 ">{errors.estimatedDeliveryTime.message}</span>}

                    </label>
                </div>
            </div>
        </div>
    )
}

export default Details