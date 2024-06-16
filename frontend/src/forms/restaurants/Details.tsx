import { restaurentType } from "@/configs/schema"
import { TextField } from "@mui/material"
import { useFormContext } from "react-hook-form"
const Details = () => {
    const { register,formState:{errors} } = useFormContext<restaurentType>()
    return (
        <div className='space-y-2'>
            <div className=' pb-6'>
                <h3 className=' text-2xl font-semibold'>Details</h3>
                <p className=' text-sm text-slate-500'>Enter the Details About your Restaurants</p>
            </div>

            <div>
                <div className="mb-8">
                    <TextField label="Name" fullWidth {...register("restaurantName")} error={!!errors.restaurantName} helperText={errors.restaurantName?.message} />
                </div>
                <div className="flex gap-6 mb-8 flex-col md:flex-row">
                    <TextField label="City" fullWidth {...register("city")} error={!!errors.city} helperText={errors.city?.message} />
                    <TextField label="Country" fullWidth {...register("country")} error={!!errors.country} helperText={errors.country?.message} />
                </div>
                <div className=" mb-8 md:w-[300px]">
                    <TextField label="Delivery Price($)" {...register("deliveryPrice")} fullWidth error={!!errors.deliveryPrice} helperText={errors.deliveryPrice?.message} />
                </div>

                <div className=" mb-8 md:w-[300px]">
                    <TextField label="Estimated Delivery Time(min)" {...register("estimatedDeliveryTime")} error={!!errors.estimatedDeliveryTime} helperText={errors.estimatedDeliveryTime?.message} fullWidth/>
                </div>
            </div>
        </div>
    )
}

export default Details