import { useState } from 'react'; 

import Layout from './layouts/Layout';
import BookInventory from './features/book/pages/BookInventory';
import Dashboard from './features/dashboard/pages/Dashboard';
import Loan from './features/loans/Loans';
import Member from './features/Members/MemberPage';
import User from './features/users/UserPage';
import Onboarding from './auth/components/Onboarding';

import LandingPage from './landingPage/components/LandingPage';

import LoginPage from './auth/components/LoginForm';
import { Routes,Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

function App() {
 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
  
    return (
       <Routes>
        <Route path="/welcome" element={<LandingPage onCompleted={() => setIsAuthenticated(true)}/>}/>
        <Route path="/login" element={<LoginPage onCompleted={ () => setIsAuthenticated(true)}/>}/>
        <Route path="/register" element={<Onboarding onCompleted={() => setIsAuthenticated(true)}/>}/>
       <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}>
           <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="books" element={<BookInventory/>}/>
            <Route path="loans" element={<Loan/>}/>
            <Route path="members" element={<Member/>}/>
            <Route path="users" element={<User/>}/>
          </Route> 
      </Route>
   
      <Route path='*' element={<Navigate to='/welcome' replace/>}/>
     
      </Routes>
    );
  }

 

export default App;