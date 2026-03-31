
import Profile from './Profile.jsx';
import Logo from './Logo.jsx';


const managementLinks = [
    {id:"dashboard", name:"Dashboard Analytics", href:"#"},
    {id:"books", name:"Books", href:"#"},
    {id:"loans", name:"Loans", href:"#"},
    {id:"members", name:"members", href:"#"},
    {id:"users", name:"users", href:"#"},
   ];
const ReportLinks = [
    {name:"Fine Collections Analitics", href:"#"},
    {name:"Usage Insights", href:"#"}
   ];

 function SideBar({setActivePage}){
  const LinkStyle = "block hover:bg-green-300 p-0 m-0 h-10 ps-5 pe-5";
  const departementTitleStyle = "text-gray-300 text-lg font-bold m-2" ;
 
  return (
        
     <aside className="relative flex flex-col bg-green-500 h-screen w-75">
     <Logo/>
      
     <nav className="flex items-start justify-start flex-col gap-12 pt-30 w-full text-lg">
        <div className='w-full'>
            <h3  className={departementTitleStyle}>MANAGEMENT</h3>
            <ul className="flex flex-col text-white font-bold">
                {
                    managementLinks.map((link) =>(
                <li key={link.id} className='p-0 m-0'>
                    
                   <a  href={link.href} 
                    className={LinkStyle}
                     onClick={(e)=>{
                        e.preventDefault();
                        setActivePage(link.id)
                        }}>
                        {link.name}
                        </a>
                        </li>
               ))
                }
                </ul>
        </div>
        <div className='w-full'>
            <h3 className={departementTitleStyle}>REPORTS</h3>
            <ul className="text-white font-bold">
                {
                    ReportLinks.map((link) =>(
                      <li key={link.name} className='p-0 m-0' ><a href={link.href} className={LinkStyle}>{link.name}</a></li>
                    ))
                }
                
            </ul>
        </div>
     </nav>
      <Profile/>
     </aside>
    );
}

export default SideBar;