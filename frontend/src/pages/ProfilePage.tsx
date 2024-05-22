import UserProfileForm, { UserformData } from '@/forms/user-profileform/UserProfileForm'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { hideHero, updateFailure, updateStart, updateSuccess } from '@/redux/slices/userSlice'
import { useEffect } from 'react'

const ProfilePage = () => {
    const dispatch = useAppDispatch()
    const { userId ,addressLine1,city,email,username,country} = useAppSelector(state => state.User)
    useEffect(() => {
        dispatch(hideHero())
    }, [])
    console.log(addressLine1)
    async function onSave(UserProfileData: UserformData) {
        dispatch(updateStart())
        try {
            const res = await fetch('/api/auth/update-profile', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...UserProfileData, id: userId })
            })

            const data = await res.json()

            if (res.ok) {
                dispatch(updateSuccess(data))
                console.log(data)
                localStorage.setItem('user',JSON.stringify({username:data.username,email:data.email,userId:data._id,addressLine1:data.addressLine1,city:data.city,country:data.country}))
            }

        } catch (error) {
            dispatch(updateFailure(error))
        }
    }
    return (
        <UserProfileForm onSave={onSave} />
    )
}

export default ProfilePage