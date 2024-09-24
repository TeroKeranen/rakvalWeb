import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
    return (
        <div className="">
            {/* <Header /> */}
            <Navbar />
            <section className="">
                <Outlet />
            </section>
            <Footer />
        </div>
    )
}

export default HomeLayout;