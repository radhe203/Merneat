import { z } from "zod"


export const restaurentSchema = z.object({
    restaurantName: z.string().min(1, "Restaurent name is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    deliveryPrice: z.coerce.number(
        {
            invalid_type_error: "Must be a number"
        },
    ).min(1, "Delivery price is required"),
    estimatedDeliveryTime: z.coerce.number(
        {
            invalid_type_error: "Must be a number"
        }
    ).min(1, "Estimated Delivery time is required"),
    cuisines: z.array(z.string()).nonempty({
        message: "Please select at least one item"
    }),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional()
})



export type restaurentType = z.infer<typeof restaurentSchema>

// export type restaurentType = {
//     restaurantName: string;
//     city: string;
//     country: string;
//     deliveryPrice: number;
//     estimatedDeliveryTime: number;
//     cuisines: [string, ...string[]];
//     imageFile: File | undefined;
//     imageUrl?: string | undefined;
// }
