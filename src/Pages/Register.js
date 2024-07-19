import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
    const [email,setEmail]=useState('')
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const navigate = useNavigate()
    const [isEmailAvailable,setIsEmailAvailable]=useState(false)
    const [isUsernameAvailable,setIsUsernameAvailable]=useState(false)


    const handleEmailChange = (event)=>{
        setEmail(event.target.value)
        setIsEmailAvailable(false)
        // console.log("email: ",email)
    }
    const handleUsernameChange = (event)=>{
        setUsername(event.target.value)
        setIsUsernameAvailable(false)
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
    const checkEmailVerification = async()=>{
        try {
            const res = await axios.post('https://thought-space-backend.onrender.com/register/checkEmail',{email})
            if(res.status===200){
                // alert('This email is already taken, Pls try a different one')
                setIsEmailAvailable(200)
            }
            else if(res.status === 400 ){
                alert('Enter the email first')
            }
            else if (res.status === 201){
                setIsEmailAvailable(201)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const checkUsernameVerification = async()=>{
        try {
            const res = await axios.post('https://thought-space-backend.onrender.com/register/checkUsername',{username})
            if(res.status===200){
                // alert('This email is already taken, Pls try a different one')
                setIsUsernameAvailable(200)
            }
            else if(res.status === 400 ){
                alert('Enter the username first')
            }
            else if (res.status === 201){
                setIsUsernameAvailable(201)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex justify-center mt-32 w-full'>
            <div className='w-96'>
                <h2 className='text-4xl text-center mb-8'>Regsiter</h2>
                <p className='text-2xl'>Email</p>
                <div className='flex items-center gap-2'>
                    <input type="text" className='text-xl border border-black rounded p-2 mb-4 w-full' onChange={handleEmailChange} value={email} />
                    <div>
                        {
                            isEmailAvailable === 201 ? 
                            (<div className='flex gap-1 items-center'>
                                <i className="fa-regular fa-circle-check mb-2 text-green-400"></i>
                                <p className='mb-2 flex gap-2 text-green-400'>
                                Available</p>
                            </div>)
                            : isEmailAvailable === 200 ?
                            (<div className='flex gap-1 items-center'>
                                <i className="fa-regular fa-circle-xmark mb-2 text-red-400"></i>
                                <p className='mb-2 flex gap-2 text-red-400 truncate'>Not Available</p>
                            </div> )
                            : ( <button 
                                onClick={checkEmailVerification}
                                className='mb-3 py-2 rounded-md px-2 border border-black'>Verify</button>)
                        }
                        
                    </div>
                </div>
                <p className='text-2xl'>Username</p>
                <div className='flex items-center gap-2'>
                    <input type="text" className='text-xl border border-black rounded p-2 mb-4 w-full' onChange={handleUsernameChange}/>
                    <div>
                        {
                            isUsernameAvailable === 201 ? 
                            (<div className='flex gap-1 items-center'>
                                <i className="fa-regular fa-circle-check mb-2 text-green-400"></i>
                                <p className='mb-2 flex gap-2 text-green-400'>
                                Available</p>
                            </div>)
                            : isUsernameAvailable === 200 ?
                            (<div className='flex gap-1 items-center'>
                                <i className="fa-regular fa-circle-xmark mb-2 text-red-400"></i>
                                <p className='mb-2 flex gap-2 text-red-400 truncate'>Not Available</p>
                            </div> )
                            : ( <button 
                                onClick={checkUsernameVerification}
                                className='mb-3 py-2 rounded-md px-2 border border-black'>Verify</button>)
                        }
                        
                    </div>
                </div>
                <p className='text-2xl'>Password</p>
                <input type="text" className='text-xl border border-black rounded p-2 mb-4 w-full' onChange={handlePasswordChange}/><br/>
                <button className='border border-black p-2 text-white bg-black rounded-lg mt-3 mb-5 ml-40 text-xl' onClick={handleRegister}>Register</button>
                <p className='text-center text-xl'>Already have an account? <Link to='/login' className='underline'>Login</Link> here</p>
            </div>
        </div>
    )
}

export default Register
