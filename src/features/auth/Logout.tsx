import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from './authApiSlice'
import { setCredentials } from './authSlice'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const dispatch = useDispatch()
    const [logout, { isLoading }] = useLogoutMutation()
    const navigate = useNavigate()
    useEffect(() => {
        const logoutUser = async () => {
            const res = await logout({}).unwrap()

            if (res) {
                localStorage.removeItem('token')
                dispatch(setCredentials({ user: null, accessToken: null }))
            }

            navigate('/')
        }
        logoutUser()
    }, [])


    return null
}

export default Logout