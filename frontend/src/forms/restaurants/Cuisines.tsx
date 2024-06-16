import { cuisineList } from "@/configs/restaurants-config"
import { restaurentType } from "@/configs/schema"
import { useFormContext } from "react-hook-form"

const Cusines = () => {
    const {register,formState:{errors}} = useFormContext<restaurentType>()
    return (
        <div
            className=" space-y-2 mb-8"
        >
            <div className=' pb-6'>
                <h3 className=' text-2xl font-semibold'>Cuisines</h3>
                <p className=' text-sm text-slate-500'> Select the cuisines that your restaurant serves</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {cuisineList.map(cusine => (
                   <label key={cusine}>
                     <input type="checkbox" value={cusine} {...register("cusines")} className=" h-[18px] w-[18px] mr-3 bg-slate-800 accent-black rounded-md" />
                     <span className=" font-medium">{cusine}</span>
                   </label>
                ))}
            </div>

            {errors.cusines && <p className=" text-sm text-red-500 my-3">{errors.cusines.message}</p>}

        </div>
    )
}

export default Cusines