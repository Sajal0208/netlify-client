import { useGetMeQuery } from "../../features/auth/authApiSlice"

const Header = () => {
    const { data } = useGetMeQuery()
    return (
        <div>

        </div>
    )
}

export default Header