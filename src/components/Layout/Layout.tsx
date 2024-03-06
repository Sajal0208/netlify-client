import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import { useGetMeQuery } from "../../features/auth/authApiSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setCredentials } from "../../features/auth/authSlice"
import axios from "axios"

const Layout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUser = async () => {
            if (localStorage.getItem('token')) {
                try {
                    const response = await axios.get('http://localhost:8000/api/auth/me', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    const { data } = response

                    dispatch(setCredentials({ user: data?.user, accessToken: localStorage.getItem('token') }))
                } catch (error) {
                    console.log(error)
                }
            }
        }

        fetchUser()
    }, [])

    return (
        <main className="min-h-screen p-8 bg-black font-mono">
            <Header />
            <Outlet />
        </main>
    )
}

export default Layout