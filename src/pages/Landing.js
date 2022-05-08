import { Header } from '../components';
import { Outlet } from "react-router-dom";

const Landing = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <Outlet />

        </div>
    )
}

export default Landing;