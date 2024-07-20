import './App.css';
import Blog from './Components/Blog';
import CreateBlog from './Components/CreateBlog';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import {Routes,Route} from 'react-router-dom'
import Register from './Pages/Register';
import Settings from './Pages/Settings';
import Profile from './Pages/Profile';
function App() {
  return (
    <div className="App px-20">
      <Navbar/>
      {/* <hr className='h-1 w-[100%] mb-3 bg-gray-100'/> */}

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/blog/:id' element={<Blog/>} />
        <Route path='/createblog' element={<CreateBlog/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/settings' element={<Settings/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
