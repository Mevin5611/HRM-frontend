import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

function AdminLogin() {
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const {login,isLoading,error} = useLogin()
    const hadlesubmit=async(e)=>{
        e.preventDefault()

        await login(email,password);
    }
  return (
    <div>
        <form className='login' onSubmit={hadlesubmit}>
            <h3 className='text-[18px] font-bold pb-3'> Admin Login</h3>

            <label>Email:</label>
            <input 
            type="email"
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            />
            <label>Password:</label>
            <input 
            type="password"
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
            />
            <button disabled={isLoading}>Log in</button>
            
            {error && <div className='error'>{error}</div>}
        </form>
      
    </div>
  )
}

export default AdminLogin
