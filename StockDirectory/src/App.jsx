import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import StockDetails from './pages/StockDetails'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/stock/details/:id' element={<StockDetails />} />
    </Routes>
  )
}

export default App
