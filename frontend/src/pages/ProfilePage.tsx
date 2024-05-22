import UserProfileForm, { UserformData } from '@/forms/user-profileform/UserProfileForm'
import { useAppDispatch } from '@/redux/hooks/hooks'
import { hideHero } from '@/redux/slices/userSlice'
import { useEffect } from 'react'

const ProfilePage = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(hideHero())
    }, [])

    async function onSave(UserProfileData:UserformData) {
        console.log(UserProfileData)
    }
    return (
       <UserProfileForm onSave={onSave}/>
    )
}

export default ProfilePage