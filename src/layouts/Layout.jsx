import Header from "./components/Header";
import SideBar from "./components/SideBar";

function Layout({ children , setActivePage }){
  

    return (
         <div className="grid grid-cols-[auto_1fr] h-screen overflow-hidden">
        <SideBar setActivePage={setActivePage} />

        <div className="flex flex-col h-full overflow-hidden">
        <Header />
        
         <main  className="flex-1 h-full w-full overflow-y-auto overflow-x-hidden bg-gray-100 p-6" >
            
            {children}
         </main>
        </div>
         </div>
        
    );
}

export default Layout;