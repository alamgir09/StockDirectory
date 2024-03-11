import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/Home'
import StockDetails from './pages/StockDetails'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/stock/details/:id' element={<StockDetails />} />
    </Routes>
  )
}

export default App
