import NavBar from "../common/NavBar.tsx";
import { Outlet } from "react-router";

const Root = () => {
    return (
        <div className="app">
            <main className="app-main">
                <Outlet />
            </main>
            <NavBar />
        </div>
    );
}

export default Root;
