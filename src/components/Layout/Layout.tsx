import { Outlet } from "react-router-dom"
import Header from "../Header/Header"


const Layout = () => {
    return (
        <main className="min-h-screen p-8 bg-black font-mono">
            <Header />
            <Outlet />
        </main>
    )
}

export default Layout