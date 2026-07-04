import React, { useState } from 'react';
import { FaBookReader, FaShieldAlt } from 'react-icons/fa';
import Register from '../../auth/components/Onboarding';
import Login from '../../auth/components/LoginForm';
import myImage from '../../assets/lib-image.png';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({onCompleted}) => {
  const navigate = useNavigate()
  

  return (
    <> 
    
   { <div className="min-h-screen bg-white text-slate-900">
      
      <nav className="flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xl md:text-2xl">
          <FaBookReader />
          <span>LibSystem</span>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <button 
          onClick={() => navigate('/login', {replace:true})}
          className="px-3 md:px-5 py-2 text-slate-600 font-medium hover:text-emerald-600 transition text-sm md:text-base">
            Login
          </button>
          <button 
          onClick={() => navigate('/register', {replace:true})}
          className="px-3 md:px-5 py-2 bg-slate-900 text-white font-semibold rounded-full hover:bg-emerald-600 transition shadow-lg text-sm md:text-base">
            Get Started
          </button>
        </div>
      </nav>

      
      <main className="max-w-6xl mx-auto mt-10 md:mt-16 px-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs md:text-sm font-semibold mb-6 border border-emerald-100">
          <FaShieldAlt /> <span>Secure Library Management</span>
        </div>
        
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 md:mb-8 leading-[1.1] tracking-tight">
          Manage your library <br className="hidden md:block" />
          <span className="text-emerald-600">with absolute ease.</span>
        </h1>
        
        <p className="text-base md:text-xl text-slate-500 max-w-2xl mb-8 md:mb-12 leading-relaxed px-2">
          The modern platform to inventory books, track circulation, and empower your members. Designed for simplicity, built for scale.
        </p>
        
        <div className="flex gap-4">
          <button className="px-6 md:px-8 py-3 md:py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition shadow-xl text-sm md:text-lg">
            Start Free Trial
          </button>
        </div>

       
        <div className="mt-12 md:mt-20 w-full px-2 md:px-0">
          <img 
            src={myImage} 
            alt="Dashboard" 
            className="w-full h-auto rounded-2xl shadow-2xl border border-slate-100 object-cover" 
          />
        </div>
      </main>

      
      <footer className="py-10 mt-10 border-t border-slate-100 text-center text-slate-400 text-xs md:text-sm">
        <div className="flex justify-center gap-6 md:gap-8 mb-4">
          <a href="#" className="hover:text-emerald-600">Documentation</a>
          <a href="#" className="hover:text-emerald-600">About</a>
          <a href="#" className="hover:text-emerald-600">Privacy</a>
        </div>
        <p>© 2026 LibSystem. All rights reserved.</p>
      </footer>
    </div>
}
</>
  );
};

export default LandingPage;