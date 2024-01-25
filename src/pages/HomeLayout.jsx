import { Outlet } from "react-router-dom";
import { Header } from "../components";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
    return (
        <>
            <Header />
            <Navbar />
            <section className="">
                <Outlet />

            </section>
        </>
    )
}

export default HomeLayout;