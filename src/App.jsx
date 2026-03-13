import Layout from './layouts/Layout';
import BookInventory from './features/book/pages/BookInventory';
import Dashboard from './features/dashboard/pages/Dashboard';
import Loan from './features/loans/Loans';
import { useState } from 'react';

function App() {
  
const [activePage, setActivePage] = useState("dashboard");
  return (
    <Layout setActivePage={setActivePage}>
      
         
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'books' && <BookInventory/>}
        {activePage === 'loans' && <Loan/>}


            
 </Layout>
  );
  }

export default App;
      