import UserProfileForm, { UserformData } from '@/forms/user-profileform/UserProfileForm'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { hideHero, updateFailure, updateStart, updateSuccess } from '@/redux/slices/userSlice'
import { useEffect } from 'react'
import { toast } from 'sonner'

const ProfilePage = () => {
    const dispatch = useAppDispatch()
    const { userId } = useAppSelector(state => state.User)
    useEffect(() => {
        dispatch(hideHero())
    }, [])
    async function onSave(UserProfileData: UserformData) {
        dispatch(updateStart())
        try {
            const res = await fetch(`https://merneat.netlify.app
/api/auth/update-profile`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...UserProfileData, id: userId })
            })

            const data = await res.json()

            const { message, user } = data

            if (res.ok) {
                dispatch(updateSuccess(user))
                localStorage.setItem('user', JSON.stringify({ username: user.username, email: user.email, userId: user._id, addressLine1: user.addressLine1, city: user.city, country: user.country }))
                toast.success(message)
            }
            if (!res.ok) {
                dispatch(updateFailure(message))
                toast.error(message)
            }

        } catch (error:any) {
            dispatch(updateFailure(error.message))
            toast.error(error.message)
        }
    }
    return (
        <UserProfileForm onSave={onSave} />
    )
}

export default ProfilePage