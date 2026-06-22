import Layout from './layouts/Layout';
import BookInventory from './features/book/pages/BookInventory';
import Dashboard from './features/dashboard/pages/Dashboard';
import Loan from './features/loans/Loans';
import Member from './features/Members/MemberPage';
import Onboarding from './auth/components/Onboarding';
import { useState } from 'react'; 

function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
const [activePage, setActivePage] = useState("dashboard");

if(!isOnboardingOpen){
    
  return (
   
      <Onboarding onCompleted={() => setIsOnboardingOpen(true)}/>
    
  );
}

  return (
    <Layout setActivePage={setActivePage}>
      
         
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'books' && <BookInventory/>}
        {activePage === 'loans' && <Loan/>}
        {activePage === 'members' && <Member/>}
        
           
    </Layout>
  );
  }

export default App;
      