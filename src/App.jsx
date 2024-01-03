import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

    
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />

      </Routes>

    </div>
  )
}

export default App
