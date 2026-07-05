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
import BookDetailsModal from './features/book/pages/BookDetailsModal';
import { useEffect } from 'react';
import { AuthService } from './services/authService';

function App() {
 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
  const checkAuth = async () => {
    const token = AuthService.getAccessToken();
    if (token) {
     
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };
  checkAuth();
}, []);

    if(isLoading){
   return (<div className='bg-gray-100 h-full w-full'> Loading ... </div>);
    }

    return (
       <Routes>
        <Route path="/welcome" element={<LandingPage onCompleted={() => setIsAuthenticated(true)}/>}/>
        <Route path="/login" element={<LoginPage onCompleted={ () => setIsAuthenticated(true)}/>}/>
        <Route path="/register" element={<Onboarding onCompleted={() => setIsAuthenticated(true)}/>}/>
       <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}>
           <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="books" element={<BookInventory/>}>
            <Route path="/books/:bookId" element={<BookDetailsModal/>}/>
            </Route>
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