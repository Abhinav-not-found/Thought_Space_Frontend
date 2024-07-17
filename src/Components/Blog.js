import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState({ title: '', desc: '' })
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({ title: '', desc: '' })
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://thought-space-backend.onrender.com/api/blog/${id}`)
        setBlog(response.data.blog)
        console.log(response.data.blog.username)
        setFormData(response.data.blog) // Initialize form data with fetched blog data
      } catch (error) {
        console.log('Internal Server Error')
      }
    }
    fetchData()
  }, [id])


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleCancel = () => {
    setEditMode(false)
    setFormData(blog) // Reset form data to the original blog data
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:5001/api/blog/${id}`, formData)
      setBlog(formData)
      setEditMode(false)
    } catch (error) {
      console.log('Internal Server Error')
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this blog post?')
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5001/api/blog/${id}`)
        navigate('/') 
      } catch (error) {
        console.log('Internal Server Error')
      }
    }
  }

  return (
    <div className='flex flex-col items-center w-full items-start mt-10'>
      <div className='flex flex-col items-start w-full'>
        {editMode ? (
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
              className='text-4xl border border-black p-2 rounded'
            />
            <textarea
              name='desc'
              value={formData.desc}
              onChange={handleChange}
              className='text-2xl mt-5 border border-black p-2 rounded'
            />
            <div className='flex gap-4'>
              <button type='submit' className='text-green-400 font-semibold' >Save</button>
              <button type='button' className='text-red-400 font-semibold'  onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <h1 className='text-4xl font-bold text-center w-full'>{blog.title}</h1><br/>
            <p>{blog.username}</p>
            <div className='flex w-full justify-center my-6 '>
              <img src={blog.image} className='h-auto w-2/5' alt="image" /><br/>
            </div>
            <p className='text-2xl px-40 mt-5'>{blog.desc}</p><br/><br/>
          </>
        )}
      </div>
      <div className='flex gap-4'>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default Blog
