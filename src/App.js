import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './Components/MenuPages/Home'
import { Login } from './Components/MenuPages/Login'
import { Notfound } from './Components/AdditionalPages/Notfound'
import { Register } from './Components/MenuPages/Register'
import { AddProducts } from './Components/AdminPages/AddProducts'
import { Profile } from './Components/MenuPages/Profile'
import { AboutUs } from './Components/AdditionalPages/AboutUs'
import { ContactUs } from './Components/AdditionalPages/ContactUs'
import { AddWinners } from './Components/AdminPages/AddWinners'
import { WinnersPage } from './Components/MenuPages/WinnersPage'
import { AdminPanel } from './Components/AdminPages/AdminPanel'
import { UserListPage } from './Components/AdminPages/UserListPage'
import { BidListPage } from './Components/AdminPages/BidListPage'
import { UserCodeListPage } from './Components/AdminPages/UserCodeListPage'
import { EditProfile } from './Components/MenuPages/EditProfile'
import { OrderListPage } from './Components/MenuPages/OrderListPage'
import { AllOrderListPage } from './Components/AdminPages/AllOrderListPage'
import { TermsandCondition } from './Components/AdditionalPages/TermsandCondition'
import { PrivacyPolicy } from './Components/AdditionalPages/PrivacyPolicy'

import { AddCategories } from './Components/AdminPages/AddCategories'
import { WalletPage } from './Components/MenuPages/WalletPage';
import CategoryPage from './Components/CategoryPages/CategoryPage';
import Footer from './Components/Footer';

import Navbar from './Components/Navbar';

function App() {
  return (
    <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path='*' element={<Notfound />} />

        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />

        <Route path="/wallet" element={<WalletPage />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/winners' element={<WinnersPage />} />

        <Route path='/my-orders' element={<OrderListPage />} />
        {/* <Route path='/all-orders' element={<AllOrderListPage/>} />   */}

        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/terms-and-conditions' element={<TermsandCondition />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />

        <Route path='/adminpanel' element={<AdminPanel />} />
        <Route path='/adminpanel/user-list' element={<UserListPage />} />
        <Route path='/adminpanel/bid-list' element={<BidListPage />} />
        <Route path='/adminpanel/add-products' element={<AddProducts />} />
        <Route path='/adminpanel/usercode-list' element={<UserCodeListPage />} />
        <Route path='/adminpanel/add-categories' element={<AddCategories />} />
        <Route path='/adminpanel/add-winners' element={<AddWinners />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

