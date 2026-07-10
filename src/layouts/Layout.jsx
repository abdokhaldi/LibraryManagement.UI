import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { Outlet, useLocation } from "react-router-dom";


function Layout() {

    // Map page IDs to display titles
    const pageTitles = {
        dashboard: "Dashboard Analytics",
        books: "Books",
        loans: "Loans",
        members: "Members",
        users: "Users",
        people: "People"
    };

    const location = useLocation();
    const currentPath = location.pathname.split("/")[1];

    const title = pageTitles[currentPath] || "Dashboard Analytics"; // Default to "Dashboard Analytics" if not found



    return (
        <div className="grid grid-cols-[auto_1fr] h-screen overflow-hidden">
            <SideBar  />

            <div className="flex flex-col h-full overflow-hidden">
                <Header title={title}  />

                <main className="flex-1 h-full w-full overflow-y-auto overflow-x-hidden bg-gray-100 p-6">
                   <Outlet />

                </main>
            </div>
        </div>
    );
}

export default Layout;
