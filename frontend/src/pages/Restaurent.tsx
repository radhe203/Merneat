import { restaurentSchema, restaurentType } from "@/configs/schema"
import Details from "@/forms/restaurants/Details"
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks"
import { hideHero, restAurentCreationFailure, restAurentCreationSatrt, restAurentCreationSuccess } from "@/redux/slices/userSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator";
import Cusines from "@/forms/restaurants/Cuisines"
import MenuSection from "@/forms/restaurants/MenuSection"
import File from "@/forms/restaurants/File"
import getCookie from "@/configs/getCooike"
import { toast } from "sonner"
import LoadingButton from "@/components/LoadingButton"
const Restaurent = () => {
    const { baseUrl, loading } = useAppSelector(state => state.User)
    const [Menu, setMenu] = useState([{
        id: 0,
        name: '',
        price: undefined,
    }])
    const [file, setFile] = useState('')

    const form = useForm<restaurentType>({
        mode: "all",
        resolver: zodResolver(restaurentSchema)
    })
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(hideHero())
    }, [])

    async function onSubmit(data: restaurentType) {
        dispatch(restAurentCreationSatrt())
        const formData = new FormData()
        formData.append("restaurantName", data.restaurantName)
        formData.append("city", data.city)
        formData.append("country", data.country)
        formData.append("deliveryPrice", data.deliveryPrice.toString())
        formData.append("estimatedDeliveryTime", data.estimatedDeliveryTime.toString())
        if (file) {
            formData.append('imageFile', file); 
        }
        data.cusines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine)
        })

        Menu.forEach((Item, index) => {
            formData.append(`menuItems[${index}][name]`, Item.name)
            formData.append(`menuItems[${index}][price]`, (Item.price as unknown as number).toString())
        })


        try {

            const res = await fetch(`${baseUrl}/api/restaurants/create`, {
                method: "POST",
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('merneat_auth_token')}`
                },
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

    return (
        <div className=" bg-slate-100 p-3 md:p-12">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Details />
                    <Separator />
                    <Cusines />
                    <Separator />
                    <MenuSection Menu={Menu} setMenu={setMenu} />
                    <Separator />
                    <File file={file} setFile={setFile} />
                    {loading ? <LoadingButton/> : <button type="submit" disabled={loading} className=" disabled:opacity-90 text-xl font-semibold px-10 py-2 bg-orange-500 text-white rounded-md">
                    Submit
                    </button>}
                </form>
            </FormProvider>
        </div>
    )
}

export default Restaurent