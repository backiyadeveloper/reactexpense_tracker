import { useState } from 'react'
import {Home} from "./components/homepage/home"
import './App.css'
import {Navbar} from "./components/navbar/nav";
import { BrowserRouter as Router,Routes,Route, BrowserRouter } from 'react-router-dom';
import Login from "./components/login/login"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login></Login>}></Route>
        <Route path='/home' element={[<Navbar></Navbar>,<Home></Home>]}></Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
