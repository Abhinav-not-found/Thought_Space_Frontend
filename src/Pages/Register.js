import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
    const [email,setEmail]=useState('')
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const navigate = useNavigate()
    const handleEmailChange = (event)=>{
        setEmail(event.target.value)
        // console.log("email: ",email)
    }
    const handleUsernameChange = (event)=>{
        setUsername(event.target.value)
        // console.log("username: ",username)
    }
    const handlePasswordChange = (event)=>{
        setPassword(event.target.value)
        // console.log("password: ",password)
    }
    const handleRegister=async()=>{
        console.log('button clicked')
        try {
            const data = {email,username,password}
            const response = await axios.post('https://thought-space-backend.onrender.com/register',data)
            // console.log(response.status)
            // console.log(response.data)
            if(response.status===200){
                alert('Register Successfull')
                navigate('/login')
            }else{
                console.log('Something Went Wrong',response.status)
            }
            
        } catch (error) {
            console.log('Error Registering User',error)
        }
    }
    return (
        <div className='flex justify-center mt-32 w-full'>
            <div className='w-96'>
                <h2 className='text-4xl text-center mb-8'>Regsiter</h2>
                <p className='text-2xl'>Email</p>
                <input type="text" className='text-xl border border-black rounded p-2 mb-4 w-full' onChange={handleEmailChange} value={email} />
                <p className='text-2xl'>Username</p>
                <input type="text" className='text-xl border border-black rounded p-2 mb-4 w-full' onChange={handleUsernameChange}/>
                <p className='text-2xl'>Password</p>
                <input type="text" className='text-xl border border-black rounded p-2 mb-4 w-full' onChange={handlePasswordChange}/><br/>
                <button className='border border-black p-2 rounded-lg mt-3 mb-5 ml-40 text-xl' onClick={handleRegister}>Register</button>
                <p className='text-center text-xl'>Already have an account? <Link to='/login' className='underline'>Login</Link> here</p>
            </div>
        </div>
    )
}

export default Register
