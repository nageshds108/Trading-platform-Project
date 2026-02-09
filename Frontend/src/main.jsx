import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'
import HomePage from './Landing_page/Home/HomePage.jsx'
import Signup from './Landing_page/signup/Signup.jsx'
import AboutPage from './Landing_page/about/AboutPage.jsx'
import Products from './Landing_page/products/Products.jsx'
import Pricing from './Landing_page/pricing/Pricing_page.jsx'
import Support from './Landing_page/support/Support_page.jsx'
import Navbar from './Landing_page/Navbar.jsx'
import Footer from './Landing_page/Footer.jsx'
import Notfound from './Landing_page/Notfound.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/products' element={<Products />} />
      <Route path='/pricing' element={<Pricing/>} />
      <Route path='/support' element={<Support/>} />
      <Route path='*' element={<Notfound/>} />
    </Routes>
    <Footer></Footer>
  </BrowserRouter>
)
