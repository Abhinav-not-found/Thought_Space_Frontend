import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const CreateBlog = () => {
  const navigate = useNavigate()
  const [title,setTitle]=useState('')
  const [desc,setDesc]=useState('')
  const [image,setImage]=useState('')
  const [username,setUsername]=useState('')
  const handleTitleChange=(event)=>{
    setTitle(event.target.value);
    // console.log('title:',title)
  }
  useEffect(()=>{
    setUsername(localStorage.getItem('username'))
  })
  const handleDescChange=(event)=>{
    setDesc(event.target.value);
    // console.log('desc:',desc)
  }
  const handleImageChange=(event)=>{
    setImage(event.target.value);
    // console.log('desc:',desc)
  }
  const handleSubmit=async()=>{
    try {
      const data = {title,desc,image,username}
      const blog = await axios.post('https://thought-space-backend.onrender.com/api/createblog',data)
      // console.log(blog.data)
      alert('Blog Created Successfully')
      navigate('/')

    } catch (error) {
      console.error('Error creating blog:', error); 
    }
  }
  return (
    <div className='w-1/2 '>
            <p className='text-2xl'>Title</p>
            <input type="text" value={title} onChange={handleTitleChange} className='border w-2/3 border-black text-xl p-2 mb-6 mt-1 rounded'/>
            <p className='text-2xl'>Description</p>
            <textarea rows={7} type="text" value={desc} onChange={handleDescChange} className='border w-full border-black text-xl p-2 mb-6 mt-1 rounded'/><br/>
            <table className='w-full mb-10'>
              <thead>
                <tr>
                  <th className='text-start text-xl font-medium pb-3'>Upload Image</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='pr-60'>Link<br/>
                    <input type="text" value={image} onChange={handleImageChange} className='border-black border rounded px-2' />
                  </td>
                  {/* <td>Upload from computer
                    <br/>
                    <input type="file" />
                    </td> */}
                </tr>
              </tbody>
            </table>
            <button onClick={handleSubmit} className='border border-black p-2 rounded'>Submit</button>
        
    </div>
  )
}

export default CreateBlog
