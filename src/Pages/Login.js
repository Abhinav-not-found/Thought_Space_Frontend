import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate()
  const handleEmailChange=(event)=>{
    setEmail(event.target.value)
  }
  const handlePasswordChange=(event)=>{
    setPassword(event.target.value)
  }
  
  const handleLogin = async()=>{
    try {
      const data = {email,password}
      const response = await axios.post('https://thought-space-backend.onrender.com/login',data)
      if(response.status===200){
        const {token} = response.data
        const {username} = response.data
        localStorage.setItem('token',token)
        localStorage.setItem('username',username)
        alert('Login Successfull')
        navigate('/')
        console.log('Setting reload timeout...');
        setTimeout(() => {
          console.log('Reloading window...'); 
          window.location.reload();
        }, 2000);
      }
      else{
        console.log('Something Went Wrong',response.status)
      }
    } catch (error) {
      console.log('Error Registering User',error)
    }
  }
  return (
    <div className='flex justify-center mt-32 w-full'>
      <div className=' w-96'>
          <h2 className='text-4xl text-center mb-8'>Login</h2>
          <p className='text-2xl'>Email</p>
          <input type="text" className='text-xl border border-black rounded p-2 mb-4 w-full' onChange={handleEmailChange} value={email}/>
          <p className='text-2xl'>Password</p>
          <input type="text" className='text-xl border border-black rounded p-2 mb-4 w-full' onChange={handlePasswordChange} value={password}/><br/>
          <button className='border border-black p-2 bg-black text-white rounded-lg mt-3 mb-5 ml-40 text-xl' onClick={handleLogin}>Login</button>
          <p className='text-center text-xl'>Don't have an account? <Link to='/register' className='underline'>Register</Link> here</p>
      </div>
</div>
  )
}

export default Login
