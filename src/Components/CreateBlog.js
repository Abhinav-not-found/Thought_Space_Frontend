import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles for ReactQuill

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const data = { title, desc, image, username };
      const blog = await axios.post('https://thought-space-backend.onrender.com/api/createblog', data);
      alert('Blog Created Successfully');
      navigate('/');
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  // Define modules for customizing toolbar
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  // Specify formats for editor
  const formats = [
    'header',
    'font',
    'size',
    'list',
    'bold',
    'italic',
    'underline',
    'align',
    'link',
    
  ];

  return (
    <div className='w-1/2 '>
      <p className='text-2xl'>Title</p>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className='border w-2/3 border-black text-xl p-2 mb-6 mt-1 rounded'
      />
      <p className='text-2xl'>Description</p>
      <ReactQuill
        theme="snow"
        value={desc}
        onChange={setDesc}
        modules={modules} // Pass modules prop for custom toolbar
        formats={formats} // Pass formats prop for supported formats
        className='w-full h-[300px] text-xl p-2 mb-6 mt-1 rounded'
      />
      <br />
      <table className='w-full mb-10'>
        <thead>
          <tr>
            <th className='text-start text-xl font-medium pb-3'>Upload Image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='pr-60'>
              Link
              <br />
              <input
                type="text"
                value={image}
                onChange={handleImageChange}
                className='border-black border rounded px-2'
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleSubmit} className='border border-black p-2 rounded'>
        Submit
      </button>
    </div>
  );
};

export default CreateBlog;
