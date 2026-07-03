import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";

function Layout() {
    // Map page IDs to display titles
    const pageTitles = {
        dashboard: "Dashboard Analytics",
        books: "Books",
        loans: "Loans",
        members: "Members",
        users: "Users"
    };

    //const title = pageTitles[activePage] || "Library Management";

    return (
        <div className="grid grid-cols-[auto_1fr] h-screen overflow-hidden">
            <SideBar  />

            <div className="flex flex-col h-full overflow-hidden">
                <Header />

                <main className="flex-1 h-full w-full overflow-y-auto overflow-x-hidden bg-gray-100 p-6">
                   <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;