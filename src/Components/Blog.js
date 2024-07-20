import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import ReactQuill styles

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: '', desc: '' });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ title: '', desc: '' });
  const [getUser, setGetUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://thought-space-backend.onrender.com/api/blog/${id}`);
        setBlog(response.data.blog);
        setFormData(response.data.blog); // Initialize form data with fetched blog data
        setGetUser(localStorage.getItem('username'));
      } catch (error) {
        console.log('Internal Server Error');
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData(blog); // Reset form data to the original blog data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://thought-space-backend.onrender.com/api/blog/${id}`, formData);
      setBlog(formData);
      setEditMode(false);
    } catch (error) {
      console.log('Internal Server Error');
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this blog post?');
    if (confirmed) {
      try {
        await axios.delete(`https://thought-space-backend.onrender.com/api/blog/${id}`);
        navigate('/');
      } catch (error) {
        console.log('Internal Server Error');
      }
    }
  };

  // Custom toolbar configuration for ReactQuill
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link'],
    ],
  };

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
            <ReactQuill
              theme="snow"
              value={formData.desc}
              onChange={(value) => setFormData({ ...formData, desc: value })}
              modules={modules} // Pass the modules prop with custom toolbar
              className='text-2xl w-[800px] h-[200px] mt-5 p-2 rounded'
            />
            <div className='flex gap-4 mt-10'>
              <button type='submit' className='text-green-400 font-semibold'>Save</button>
              <button type='button' className='text-red-400 font-semibold' onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        ) : (
          <>
          <div className='flex w-full justify-center my-6 '>
              <img src={blog.image} className='h-auto w-3/5' alt="image" /><br />
            </div>
            <h1 className='text-5xl font-bold text-center w-full'>{blog.title}</h1><br />
            <div className='flex gap-4 w-full px-40 mt-4'>
              <p className='text-xl'>@{blog.username}</p>
              {
                getUser === blog.username ?
                  <div className='flex gap-4'>
                    <button onClick={handleEdit} className='flex items-center gap-2 text-yellow-500'>
                      <i className="fa-solid fa-pen-to-square"></i>
                      Edit
                    </button>
                    <button onClick={handleDelete} className='flex items-center gap-2 text-red-500'>
                      <i className="fa-solid fa-trash text-sm"></i>
                      Delete
                    </button>
                  </div>
                  :
                  <>
                  </>
              }
            </div>

            
            <div className='text-2xl px-40 mt-5 mb-40' dangerouslySetInnerHTML={{ __html: blog.desc }} />
          </>
        )}
      </div>


    </div>
  );
};

export default Blog;
