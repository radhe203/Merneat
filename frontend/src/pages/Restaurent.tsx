import { restaurentSchema, restaurentType } from "@/configs/schema"
import Details from "@/forms/restaurants/Details"
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks"
import { hideHero, restAurentCreationFailure, restAurentCreationSatrt, restAurentCreationSuccess } from "@/redux/slices/userSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator";
import Cuisines from "@/forms/restaurants/Cuisines"
import MenuSection from "@/forms/restaurants/MenuSection"
import File from "@/forms/restaurants/File"
import { toast } from "sonner"
import LoadingButton from "@/components/LoadingButton"
import getRestaurant from "@/utils/getRestaurant"

const Restaurent = () => {
    const { baseUrl, loading, userId } = useAppSelector(state => state.User)
    const [preData, setPreData] = useState<restaurentType>()
    const [Menu, setMenu] = useState([{
        _id: 0,
        name: '',
        price: undefined,
    }])
    const [file, setFile] = useState('')

    const form = useForm<restaurentType>({
        mode: "all",
        resolver: zodResolver(restaurentSchema),

    })
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(hideHero())
    }, [])



    async function fetchRestaurent() {
        const data = await getRestaurant(baseUrl, userId)
       if(data){
        setPreData({
            restaurantName: data.restaurantName,
            city: data.city,
            country:data.country,
            deliveryPrice:data.deliveryPrice,
            estimatedDeliveryTime:data.estimatedDeliveryTime,
            cuisines: data.cuisines,
            imageUrl: data.imageUrl
        })

        setMenu(data.menuItems)
       }
    }
    useEffect(() => {
        fetchRestaurent()
    }, [])

    useEffect(()=>{
        form.reset(preData)
    },[preData])

    //submit area =====================
    async function onSubmit(data: restaurentType) {
        dispatch(restAurentCreationSatrt())
        const formData = new FormData()
        formData.append("restaurantName", data.restaurantName)
        formData.append("city", data.city)
        formData.append("country", data.country)
        formData.append("deliveryPrice", data.deliveryPrice.toString())
        formData.append("estimatedDeliveryTime", data.estimatedDeliveryTime.toString())
        if (preData?.imageUrl) {
            formData.append("imageurl", preData.imageUrl)
        }
        if (file) {
            formData.append('imageFile', file);
        }
        data.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine)
        })

        Menu.forEach((Item, index) => {
            formData.append(`menuItems[${index}][name]`, Item.name)
            formData.append(`menuItems[${index}][price]`, (Item.price as unknown as number).toString())
        })

        try {
            const url = preData ? `${baseUrl}/api/restaurants/update/${userId}`:`${baseUrl}/api/restaurants/create`
            const res = await fetch(url, {
                method: preData ? "PUT" : "POST",
                credentials: "include",
                body: formData
            })

            const data = await res.json()

            if (res.ok) {
                dispatch(restAurentCreationSuccess())
                toast.success(data.message)
            }
            if (!res.ok) {
                dispatch(restAurentCreationFailure(data.message))
                toast.success(data.message)
            }


        } catch (error: any) {
            dispatch(restAurentCreationFailure(error.message))
            toast.error(error.message)
        }


    }
    //submit area =====================

    return (
        <div className=" bg-slate-100 p-3 md:p-12">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Details />
                    <Separator />
                    <Cuisines />
                    <Separator />
                    <MenuSection Menu={Menu} setMenu={setMenu} />
                    <Separator />
                    {preData &&
                        <div className=" max-w-96 my-4">
                            <img src={preData?.imageUrl} alt="" className="h-full w-full" />
                        </div>
                    }
                    <File file={file} setFile={setFile} preData/>
                    {loading ? <LoadingButton /> : <button type="submit" disabled={loading} className=" disabled:opacity-90 text-xl font-semibold px-10 py-2 bg-orange-500 text-white rounded-md">
                       {preData ? "Update" :"Submit"}
                    </button>}
                </form>
            </FormProvider>
        </div>
    )
}

export default Restaurent

// name={preData?.restaurantName} city={preData?.city} country={preData?.country} deliveryPrice={preData?.deliveryPrice} estimatedDeliveryTime={preData?.estimatedDeliveryTime}