import { Link } from "react-router-dom"
import { useGetMeQuery } from "../../features/auth/authApiSlice"
import { useEffect } from "react"
import { Button } from "../ui/button"
import { selectCurrentUser } from "../../features/auth/authSlice"
import { useSelector } from "react-redux";


const Header = () => {
    const { data, isLoading, isFetching } = useGetMeQuery()
    const user = useSelector(selectCurrentUser)
    // const { user } = data || {}
    const { username } = user || {}

    if (isLoading || isFetching) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-row text-white  justify-between items-center">
            <div className="flex flex-row gap-x-4 items-center justify-center">
                <Link to='/'>
                    <img width={25} height={25} src="/white_circle.svg" alt="White Circle" />
                </Link>
                <p>
                    /
                </p>
                <p className='gap-x-2 flex flex-row items-center '>
                    <span>
                        <img width={25} height={25} src="/gradient_triangle.svg" alt="White Circle" />
                    </span>
                    {username ? <span>
                        {data?.user.username}
                    </span> : <></>}
                </p>
                {username ? <Button className='text-white' variant={'link'}>
                    <Link to='/deploy'>
                        Deploy
                    </Link>
                </Button> : <></>}
            </div>
            <div className="flex flex-row gap-x-4 items-center justify-center">
                {!username ? <>
                    <Button variant={'default'} className="bg-white text-black hover:bg-gray-900 hover:text-white">
                        <Link to='/signin'>
                            Log In
                        </Link>
                    </Button>
                    <Button variant={'default'} className="text-white bg-gray-900  hover:bg-white hover:text-black">
                        <Link to='/signup'>
                            Register
                        </Link>
                    </Button>
                </> : <>
                    <Button className="text-white" variant={'link'}>
                        <Link to='/profile'>
                            My Account
                        </Link>
                    </Button>
                    <Button variant={'default'} className="bg-white text-black hover:bg-gray-300">
                        <Link to='/logout'>
                            Log Out
                        </Link>
                    </Button>
                </>}

            </div>

        </div>
    )
}

export default Header