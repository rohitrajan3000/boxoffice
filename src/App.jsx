import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AllReview from './components/AllReview';
import Home from './components/Home';
import Login from './components/Login';
import Movie from './components/Movie';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import UserReview from './components/UserReview';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

    
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/Movie/:id' element={< Movie />} />
        <Route path='/allreview' element={< AllReview />} />
        <Route path='/profile' element={< Profile />} />
        <Route path='/userReview' element={<UserReview />} />
      </Routes>

    </div>
  )
}

export default App



