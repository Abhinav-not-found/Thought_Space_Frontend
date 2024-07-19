import React, { useState, useEffect } from 'react';
import profileIcon from '../Assets/Images/profile-icon.png';
import axios from 'axios';

const Settings = () => {
    const [activePage, setActivePage] = useState(1);
    const [imgActive, setImgActive] = useState(false);
    const [uploadMode, setUploadMode] = useState('link');
    const [image, setImage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(profileIcon);
    const [userData,setUserData]=useState('')
    const [username,setUsername]=useState('')
    // Fetch the existing image link when the component mounts
    useEffect(() => {
        const fetchImage = async () => {
            try {
                // const response = await axios.get('http://localhost:5001/api/settings/image');
                // if (response.status === 200 && response.data.image) {
                //     setUploadedImageUrl(response.data.image);
                // }
                
                // console.log(response2.data.users.email)
                
                
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
        const fetUsers = async()=>{
            try {
                const response2 = await axios.get('https://thought-space-backend.onrender.com/setting')
                setUserData(response2.data.users)
                setUsername(localStorage.getItem('user'))
                console.log(username)
                const users=response2.data.users
                const userMatch = users.some(user=>user.username===username)
                // if(username && userMatch){
                //     console.log(userMatch)
                // }
                // else{
                //     console.log('do not match')
                // }
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }
        fetUsers()
    }, []);

    const handleProfileImage = () => {
        setImgActive(!imgActive);
    };

    const handleImageUploadMode = () => {
        setUploadMode(uploadMode === 'link' ? 'upload' : 'link');
    };

    const handleImgUpload = async () => {
        try {
            if (uploadMode === 'link') {
                const response = await axios.post('https://thought-space-backend.onrender.com/api/settings', { image });
                if (response.status === 200) {
                    alert('Image uploaded successfully');
                    setUploadedImageUrl(image); // Set uploaded image URL
                }
            } else if (uploadMode === 'upload' && selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);

                const response = await axios.post('https://thought-space-backend.onrender.com/api/settings', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status === 200) {
                    alert('Image uploaded successfully');
                    setUploadedImageUrl(URL.createObjectURL(selectedFile)); // Set uploaded image URL
                }
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleImageChange = (event) => {
        if (uploadMode === 'link') {
            setImage(event.target.value);
        } else if (uploadMode === 'upload') {
            setSelectedFile(event.target.files[0]);
        }
    };

    return (
        <div className='flex'>
            <div className='w-1/4 h-[90vh] flex flex-col px-2 pr-4 py-2 gap-3 border-r-2 border-black'>
                <button onClick={() => setActivePage(1)} className='rounded py-1 text-start px-3 border-black border'>Profile</button>
                <button onClick={() => setActivePage(2)} className='rounded py-1 text-start px-3 border-black border'>Saved Blog</button>
                <button onClick={() => setActivePage(3)} className='rounded py-1 text-start px-3 border-black border'>Feedback</button>
                {/* <button onClick={() => setActivePage(4)} className='rounded py-1 text-start px-3 border-black border'>4</button> */}
            </div>
            <div className='w-3/4 p-4 relative'>
                {activePage === 1 &&
                    <div>
                        <h1 className='text-4xl uppercase mb-2'>Profile Settings</h1>
                        <hr />
                        <div onClick={handleProfileImage}
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
                        {imgActive &&
                            <div className='absolute top-[11%] right-[13%] mr-72 px-2 py-1 rounded-lg w-80 h-40 border border-gray-400 flex flex-col items-start gap-3'>
                                <div className='flex gap-3'>
                                    <button onClick={handleImageUploadMode}>Link</button>
                                    <button onClick={handleImageUploadMode}>Upload</button>
                                </div>
                                <div>
                                    {uploadMode === 'link' ? (
                                        <div className='flex flex-col'>
                                            <input type='text' value={image} onChange={handleImageChange} className='border border-gray-400 rounded mt-3 p-2' placeholder='Enter Link' />
                                            <button type='button' onClick={handleImgUpload}>Upload</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <input type='file' onChange={handleImageChange} />
                                            <button type='button' onClick={handleImgUpload}>Upload</button>
                                        </div>
                                    )}
                                </div>
                            </div>}
                        <div className='flex flex-col w-1/2 gap-4 mt-3'>
                            <p>Email</p>
                            <input type="text"  className='border border-black' />
                            <p>Username</p>
                            <input type="text"  className='border border-black' />
                            <p>Password</p>
                            <input type="text"  className='border border-black' />
                            <button className='text-start w-fit border border-black p-2 rounded-lg'>Save</button>
                        </div>
                    </div>
                }
                {activePage === 2 && <div>This is page 2</div>}
                {activePage === 3 && 
                <div class="bg-gray-100 rounded-lg p-8 shadow-md">
                    <h1 class="text-2xl font-bold mb-4">Feedback Form</h1>
                    <p class="text-gray-700 leading-relaxed">
                        This form is designed for providing constructive feedback to help improve our services. Whether you've encountered bugs, issues, or have valuable suggestions for enhancements, your input is highly appreciated. Please take a moment to fill out this form.
                    </p>
                    <textarea type="text" className='w-full h-[250px] rounded-md outline-none p-2 my-6 resize-none' /><br/>
                    <button className='border border-black p-2 px-3 rounded-md'>Submit</button>
                </div>
            
            }
                {/* {activePage === 4 && <div>This is page 4</div>} */}
            </div>
        </div>
    );
};

export default Settings;
