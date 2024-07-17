import React, { useState } from 'react';
import FailedImage from '../Assets/Images/failedImage.png';

const Card = ({ onClick, title, desc, image,username }) => {
const backgroundImage = image ? `url('${image}')` : `url('${FailedImage}')`;
const [isSaved,setIsSaved]=useState(false)
const [isHeart,setIsHeart]=useState(false)
const [likes,setLikes]=useState(0)
const handleSaveToggle =()=>{
  setIsSaved(!isSaved)
}
const handleHeartToggle =()=>{
  setIsHeart(!isHeart)
  if(isHeart){
    setLikes(likes-1)
  }
  else{
    setLikes(likes+1)
  }
}

  return (
    <div className='flex border-black border justify-between p-4 rounded-lg items-start mb-3'>
      <div>
        <h1 onClick={onClick}  className='text-3xl cursor-pointer mb-1 font-medium whitespace-nowrap text-ellipsis'>{title}</h1>
        <p className='text-lg'>{desc}</p>
        <div className='flex items-center gap-5'>
          
          <div className='flex gap-3'>
            <button onClick={handleSaveToggle}>
              {isSaved?
              <i class="fa-solid fa-bookmark" />
              :
              <i class="fa-regular fa-bookmark" />
            }
            </button>
            <button onClick={handleHeartToggle}>
              {isHeart?
              <div className='flex items-center gap-2'>
                <i class="fa-solid fa-heart" />
                <p>{likes}</p>
              </div>
              :
              <div className='flex items-center gap-2'>
                <i class="fa-regular fa-heart" />
                <p>{likes}</p>
              </div>
            }
            </button>
          </div>
          <p>@{username}</p>
        </div>
      </div>
      <div
        onClick={onClick} 
        style={{
          backgroundImage,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',  
        }}
        className='h-24 w-24 rounded cursor-pointer'
      ></div>
    </div>
  );
};

export default Card;