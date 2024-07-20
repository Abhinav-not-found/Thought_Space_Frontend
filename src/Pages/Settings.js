import React, { useState, useEffect } from 'react';
import profileIcon from '../Assets/Images/profile-icon.png';
import axios from 'axios';

const Settings = () => {
    const [activePage, setActivePage] = useState(1);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(profileIcon);
    const [username, setUsername] = useState('');
    const [feedbackChange, setFeedbackChange] = useState('');
    const [bio, setBio] = useState('');
    const [instagram, setInsta] = useState('');

    const [email,setEmail]=useState('')
    
    useEffect(() => {
        const username = localStorage.getItem('username')
        const fetchProfileInfo = async () => {
            try {
                setUsername(localStorage.getItem('username'));

                const response = await axios.get('https://thought-space-backend.onrender.com/settings/profileInfo', {
                    params: { user: username }
                });

                if (response.status === 200 && response.data.user) {
                    const { bio, instagram, profileImage } = response.data.user;
                    setBio(bio || '');
                    setInsta(instagram || '');
                    setUploadedImageUrl(profileImage || profileIcon);
                } else {
                    console.log('User not found');
                }
            } catch (error) {
                console.error('Error fetching profile info:', error);
            }
        };
        fetchProfileInfo();
        const fetchProfileLogin = async () =>{
            const response = await axios.get('http://localhost:5001/settings/profileLogin',{params:{username:username}})
            if(response.status===200){
                setEmail(response.data.user.email)
                console.log(response.data)
            }
            else{
                console.log('usern not found')
            }
        }
        fetchProfileLogin()
    }, []);

    const handleFeedbackTextChange = (event) => {
        setFeedbackChange(event.target.value);
    };

    const handleFeedback = async () => {
        try {
            const data = { feedback: feedbackChange };
            const response = await axios.post('https://thought-space-backend.onrender.com/setting/feedback', data);
            if (response.status === 200) {
                alert('Feedback Sent Successfully');
            } else {
                alert('Something Went Wrong');
            }
        } catch (error) {
            console.error('Error sending feedback:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request made but no response received:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
        }
    };

    const handleBio = (event) => {
        setBio(event.target.value);
    };

    const handleInsta = (event) => {
        setInsta(event.target.value);
    };

    const handleProfileInfo = async () => {
        try {
            const user = localStorage.getItem('username');
            const data = { bio, instagram, user };
            const response = await axios.put('https://thought-space-backend.onrender.com/settings/profileInfo', data);
            if (response.status === 200) {
                alert('Updated!!!');
            } else {
                console.log('Something Went Wrong...');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex'>
            <div className='w-1/4 h-[90vh] flex flex-col px-2 pr-4 py-2 gap-3 border-r-2 border-black'>
                <button onClick={() => setActivePage(1)} className='rounded py-1 text-start px-3 border-black border'>Profile</button>
                <button onClick={() => setActivePage(4)} className='rounded py-1 text-start px-3 border-black border'>Posted Blogs</button>
                <button onClick={() => setActivePage(2)} className='rounded py-1 text-start px-3 border-black border'>Saved Blog</button>
                <button onClick={() => setActivePage(3)} className='rounded py-1 text-start px-3 border-black border'>Feedback</button>
            </div>
            <div className='w-3/4 p-4 relative'>
                {activePage === 1 &&
                    <div>
                        <h1 className='text-4xl uppercase mb-2'>Profile Settings</h1>
                        <hr />
                        <div
                            className='h-40 w-40 mt-5 ml-3 opacity-50 text-center rounded-full cursor-pointer flex justify-center items-center text-white text-xl'
                            style={{
                                backgroundImage: `url(${uploadedImageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            click to upload
                        </div>
                        {/* Profile Settings */}
                        <div className='flex flex-col w-1/2 gap-4 mt-3'>
                            <p>Email</p>
                            <input type="text" value={email} className='border px-1 rounded border-black' />
                            <p>Username</p>
                            <input type="text" value={username} className='border px-1 rounded border-black' />
                            {/* <p>Password</p>
                            <input type="text" className='border border-black' /> */}
                            <button className='text-start w-fit border border-black p-2 rounded-lg'>Save</button>
                        </div>
                        {/* Profile Info */}
                        <div className='mt-10 h-80 mb-40'>
                            <h1 className='text-4xl mb-2'>Profile Info</h1>
                            <hr className='mb-5'/>
                            <p className='text-xl'>Bio</p>
                            <textarea value={bio} onChange={handleBio} className='border border-black w-1/2 h-1/2 resize-none outline-none rounded mb-5 p-2' />
                            <p className='text-xl'>Social Handles</p>
                            <div className='flex gap-3 mt-5'>
                                <i className="fa-brands fa-instagram text-2xl" />
                                <input value={instagram} onChange={handleInsta} type="text" className='border px-1 border-black outline-none rounded w-1/4' />
                            </div>
                            <button onClick={handleProfileInfo} className='mt-5 border border-black p-2 rounded'>Update</button>
                        </div>
                    </div>
                }
                {activePage === 2 && <div>This is page 2</div>}
                {activePage === 3 &&
                    <div className="bg-gray-100 rounded-lg p-8 shadow-md">
                        <h1 className="text-2xl font-bold mb-4">Feedback Form</h1>
                        <p className="text-gray-700 leading-relaxed">
                            This form is designed for providing constructive feedback to help improve our services. Whether you've encountered bugs, issues, or have valuable suggestions for enhancements, your input is highly appreciated. Please take a moment to fill out this form.
                        </p>
                        <textarea type="text" value={feedbackChange} required onChange={handleFeedbackTextChange} className='w-full h-[250px] rounded-md outline-none p-2 my-6 resize-none' /><br />
                        <button onClick={handleFeedback} className='border border-black p-2 px-3 rounded-md'>Submit</button>
                    </div>
                }
                {activePage === 4 && <div>This is page 4</div>}
            </div>
        </div>
    );
};

export default Settings;
