import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/api";

const AuthContext=createContext(null);
const SESSION_KEY="reloop_session";
const ROLE_LABEL={customer:"customer",repair_partner:"repair partner",admin:"administrator"};

export function AuthProvider({children}){
  const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem(SESSION_KEY)||"null");}catch{return null;}});
  const [loading,setLoading]=useState(Boolean(localStorage.getItem("reloop_token")));
  useEffect(()=>{const token=localStorage.getItem("reloop_token");if(!token){setLoading(false);return;}api('/auth/me').then(({user:u})=>{setUser(u);localStorage.setItem(SESSION_KEY,JSON.stringify(u));}).catch(()=>{localStorage.removeItem('reloop_token');localStorage.removeItem(SESSION_KEY);setUser(null);}).finally(()=>setLoading(false));},[]);
  async function login(payload){const data=await api('/auth/login',{method:'POST',body:JSON.stringify(payload)});if(data.pendingVerification)return data;localStorage.setItem('reloop_token',data.token);localStorage.setItem(SESSION_KEY,JSON.stringify(data.user));setUser(data.user);return data;}
  async function register(payload){return api('/auth/register',{method:'POST',body:JSON.stringify(payload)});}
  async function verifyEmail(payload){const data=await api('/auth/verify-email',{method:'POST',body:JSON.stringify(payload)});localStorage.setItem('reloop_token',data.token);localStorage.setItem(SESSION_KEY,JSON.stringify(data.user));setUser(data.user);return data;}
  async function resendVerification(email){return api('/auth/resend-verification',{method:'POST',body:JSON.stringify({email})});}
  async function forgotPassword(payload){return api('/auth/forgot-password',{method:'POST',body:JSON.stringify(payload)});}
  async function resetPassword(payload){return api('/auth/reset-password',{method:'POST',body:JSON.stringify(payload)});}
  function updateUserRecord(id,patch){setUser(prev=>prev?.id===id?{...prev,...patch}:prev);}
  function logout(){localStorage.removeItem('reloop_token');localStorage.removeItem(SESSION_KEY);setUser(null);}
  return <AuthContext.Provider value={{user,users:[],isAuthenticated:Boolean(user),loading,login,register,verifyEmail,resendVerification,forgotPassword,resetPassword,updateUserRecord,logout,roleLabel:ROLE_LABEL}}>{children}</AuthContext.Provider>;
}
export function useAuth(){const ctx=useContext(AuthContext);if(!ctx)throw new Error('useAuth must be used within an AuthProvider');return ctx;}
