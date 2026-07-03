
import Profile from './Profile.jsx';
import Logo from './Logo.jsx';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


const managementLinks = [
    {id:"/dashboard", name:"Dashboard Analytics", href:"#"},
    {id:"/books", name:"Books", href:"#"},
    {id:"/loans", name:"Loans", href:"#"},
    {id:"/members", name:"Members", href:"#"},
    {id:"/users", name:"Users", href:"#"},
   ];
const ReportLinks = [
    {name:"Fine Collections Analitics", href:"#"},
    {name:"Usage Insights", href:"#"}
   ];
   
   

 function SideBar(){
  const LinkStyle = "flex items-center w-full hover:bg-green-300 p-0 m-0 h-10 ps-5";
  const departementTitleStyle = "text-gray-300 text-lg font-bold m-2" ;
 
  return (
        
     <aside className="relative flex flex-col bg-green-500 h-screen w-75">
     <Logo/>
      
     <nav className="flex items-start justify-start flex-col gap-12 pt-30 w-full text-lg">
        <div className='w-full'>
            <h3  className={departementTitleStyle}> MANAGEMENT </h3>
            <ul className="flex flex-col text-white font-bold gap-2">
                {
                    managementLinks.map((link) =>(
                <li key={link.id} className={LinkStyle}>
                    
                   <NavLink to={link.id} className={'w-full h-full'}>
                     {link.name}
                    </NavLink>
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