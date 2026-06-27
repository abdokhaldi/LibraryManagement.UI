import React from 'react';
import { FaBookReader, FaArrowRight } from 'react-icons/fa';
import { login } from '../../services/authService';
import { useState } from 'react';

export default function LoginPage({onCompleted}) {

  const [credentials , setCredentials] = useState({identifier : "", password : ""});
  
  const HandleLogin = async (identifier, password) => {
     try{

      console.log(`Attempting to login with identifier: ${identifier} and password: ${password}`);
      const result = await login(identifier, password);
      if(!result.success){
        alert(result.errorMessage);
        return;
      }
      
      alert(result.message); 
      onCompleted();
      
     }catch(error){
      console.log(error.message);
     }
  }
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        
       
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-3xl mb-4">
            <FaBookReader />
            <span>LibSystem</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Please enter your details to sign in</p>
        </div>

        
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <form
           className="flex flex-col gap-5"
           onSubmit={(e) =>{e.preventDefault(); HandleLogin(credentials.identifier,credentials.password);}}
          >
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input 
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                placeholder="name@library.com"
                value={credentials.identifier}
                onChange={(e) => setCredentials((prev) => ({ ...prev, identifier: e.target.value }))}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
               
                <a href="#" className="text-xs font-semibold text-emerald-600 hover:underline">Forgot password?</a>
              </div>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
              />
            </div>

           
            <div className="flex items-center gap-2">
              <input 
    type="checkbox" 
    id="remember" 
   
    className="w-4 h-4 rounded border-slate-300 accent-emerald-600 focus:ring-emerald-500 transition cursor-pointer"
  />
  <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer select-none">
    Remember me
  </label>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 mt-2"
            >
              Sign In <FaArrowRight className="text-sm" />
            </button>
          </form>

          {/* Footer Options */}
          <div className="mt-6 text-center text-sm text-slate-500">
            Don't have an account? <a href="#" className="text-emerald-600 font-semibold hover:underline">Register now</a>
          </div>
        </div>

        <div className="mt-8 text-center text-slate-400 text-xs">
          © 2026 LibSystem. Secure Access.
        </div>
      </div>
    </div>
  );
}