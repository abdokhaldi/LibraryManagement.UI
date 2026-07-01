import Layout from './layouts/Layout';
import BookInventory from './features/book/pages/BookInventory';
import Dashboard from './features/dashboard/pages/Dashboard';
import Loan from './features/loans/Loans';
import Member from './features/Members/MemberPage';
import User from './features/users/UserPage';
import Onboarding from './auth/components/Onboarding';
import { useState } from 'react'; 
import LandingPage from './landingPage/components/LandingPage';

function App() {
  const [isLandingPageOpen, setIsLandingPageOpen] = useState(false);
const [activePage, setActivePage] = useState("dashboard");

if(!isLandingPageOpen){
    
  return (
   <LandingPage onCompleted={(q) => setIsLandingPageOpen(true)}/>
   );
}

  return (
    <Layout setActivePage={setActivePage}>
      
         
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'books' && <BookInventory/>}
        {activePage === 'loans' && <Loan/>}
        {activePage === 'members' && <Member/>}
        {activePage === 'users' && <User/>}
           
    </Layout>
  );
  }

export default App;
      