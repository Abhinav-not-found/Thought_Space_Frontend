  import React, { useEffect, useRef, useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  import profileIcon from '../Assets/Images/profile-icon.png'
  const Navbar = () => {
    const [isloggedin,setIsloggedin]=useState(true)
    const [appear,setAppear]=useState(true)
    const [profile,setProfile]=useState(false)
    const [username,setUsername]=useState('')
    const navigate = useNavigate()
    const searchInputRef = useRef(null)
    useEffect(()=>{
      checkToken()
      const handleKeyDown = (event)=>{
        if(event.ctrlKey && event.key === 'k'){
          event.preventDefault()
          searchInputRef.current.focus()
        }
        
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
    })
    useEffect(() => {
      const response = ()=>{
        if(isloggedin){
          const temp = localStorage.getItem('username')
          setUsername(temp)
        }
      }
      response()
    }, [isloggedin]);

    const checkToken = () =>{
      const token = localStorage.getItem('token')
      if(!token){
        setIsloggedin(false)
      }
    }
    
    const handleLogout=()=>{
      const  confirmLogout = window.confirm('Are you sure you want to logout?')
      if(confirmLogout){
        localStorage.removeItem('token')
        alert('Logout Successfull')
        window.location.reload()
      }
    }
    const handleFocus=()=>{
      setAppear(false)
    }
    const handleBlur=()=>{
      setAppear(true)
    }
    const handleProfile=(event)=>{
      if(profile === true){
        setProfile(false)
      }
      else{
        setProfile(true)
      }
    }
    return (
      <div className='flex justify-between h-10 items-center mb-4 mt-3'>
        <div onClick={()=>{navigate('/')}} className='cursor-pointer text-3xl' >
          <i className="fa-solid fa-pen-nib"></i>
        </div>


          {/* search bar */}
        <div className='border border-black p-1 px-2 pr-10 rounded-md relative'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" className='outline-none ml-3' onFocus={handleFocus} onBlur={handleBlur} ref={searchInputRef} />
          {appear? <p className='absolute top-1 right-2 opacity-30 bg-slate-300 px-2 rounded-md'>CTRL K</p> : 
          <p className='hidden absolute top-1 right-2 opacity-30 bg-slate-300 px-2 rounded-md'>CTRL K</p>
          }
          
        </div>


        <div className='flex gap-5'>
          <button onClick={()=>{navigate('/createblog')}} className='bg-black text-white p-1 px-2 rounded-md' >Create</button>
          {!isloggedin? <button onClick={()=>{navigate('/login')}} className='border border-black p-1 px-2 rounded-md'>Sign In</button> : 
          <div onClick={handleProfile} className='border rounded-full h-10 w-10 border-black cursor-pointer opacity-50'
          style={{
            backgroundImage: `url(${profileIcon})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          ></div>
          }
          {profile ? <div className='h-auto w-24 bg-white absolute right-14 top-14 rounded-lg p-2 border border-black flex flex-col justify-center gap-2'>
            <button onClick={()=>navigate('/settings')}>Settings</button>
            <button onClick={handleLogout} className='bg-black text-white h-fit w-full rounded p-1'>Logout</button>
          </div> : <></>}
        </div>

      </div>
    )
  }

  export default Navbar
