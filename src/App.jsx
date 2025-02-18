import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import { Home } from './components/Home'
import { Product } from './components/Product'
import { Cart } from './components/Cart'
import { Navbar } from './components/Navbar'

 const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    </Router>
    </>
    
  )
}
export default App
