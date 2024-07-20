import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://thought-space-backend.onrender.com/api/');
                // console.log(response.data.blogs);
                setBlogs(response.data.blogs);
            } catch (error) {
                console.log('Internal Server Error');
            }
        };
        fetchData();
    }, []);

    const truncateDesc = (desc) => {
        const words = desc.trim().split(/\s+/);
        if (words.length > 13) {
            return words.slice(0, 13).join(' ') + '...';
        }
        return desc;
    }

    const truncateTitle = (title)=>{
        const words = title.trim().split(/\s+/);
        // console.log(words)
        if(words.length>5){
            return words.slice(0,5).join(' ')+'...';
        }
        // console.log(words.slice(0,5).join(' '))
        return title;
    }



    return (
        <div>
            {blogs.length > 0 ? (
                blogs.map(blog => {
                    
                    return (
                        <Card 
                            key={blog._id}
                            date={blog.createdAt}
                            title={truncateTitle(blog.title)}
                            desc={truncateDesc(blog.desc)}
                            image={blog.image}
                            username={blog.username}
                            onClick={() => navigate('/blog/' + blog._id)} 
                        />
                    );
                })
            ) : (
                <p>No Blogs Available</p>
            )}
        </div>
    );
}

export default Home;
