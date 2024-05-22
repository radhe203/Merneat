
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/redux/hooks/hooks"
import LoadingButton from "@/components/LoadingButton"
import { Button } from "@/components/ui/button"
const FormSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "name is required"),
    addressLine1: z.string().min(1, "Address line 1 is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
})

export type UserformData = z.infer<typeof FormSchema>
type Props = {
    onSave: (UserProfileData: UserformData) => void
}
const UserProfileForm = ({ onSave }: Props) => {
    const form = useForm<UserformData>({
        resolver: zodResolver(FormSchema)
    })
    const { loading } = useAppSelector(state => state.User)
   
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)}
                className=" space-y-4 bg-gray-50 rounded-lg md:p-10"
            >

                <div>
                    <h2 className=" text-2xl font-bold">User Profile Form</h2>
                    <FormDescription>
                        View and change your profile information here
                    </FormDescription>
                </div>

                <FormField control={form.control} name="email" render={({ field }) => {
                    return <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                }} />

                <FormField control={form.control} name="name" render={({ field }) => {
                    return <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />

                    </FormItem>
                }} />

                <div className=" flex flex-col md:flex-row md:gap-4">
                    <FormField control={form.control} name="addressLine1" render={({ field }) => {
                        return <FormItem className=" flex-1">
                            <FormLabel>Address line 1</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    }} />
                    <FormField control={form.control} name="city" render={({ field }) => {
                        return <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    }} />
                    <FormField control={form.control} name="country" render={({ field }) => {
                        return <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    }} />

                </div>
                {
                    loading ? (
                        <LoadingButton />
                    ) : (
                        <Button type="submit" className=" bg-orange-500 ">Submit</Button>

                    )
                }
            </form>
        </Form>
    )
}

export default UserProfileForm