import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from './Components/TopNavbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './Components/Home'
import { Login } from './Components/Login'
import { Notfound } from './Components/Notfound'
import { Signup } from './Components/Signup'
import { AddProducts } from './Components/AddProducts'
import { Profile } from './Components/Profile'
import { AboutUs } from './Components/AboutUs'
import { ContactUs } from './Components/ContactUs'
import { AddWinners } from './Components/AddWinners'
import { WinnersPage } from './Components/WinnersPage'
import { AdminPanel } from './Components/AdminPanel'
import { UserListPage } from './Components/UserListPage'
import { BidListPage } from './Components/BidListPage'
import { UserCodeListPage } from './Components/UserCodeListPage'
import { EditProfile } from './Components/EditProfile'
import { OrderListPage } from './Components/OrderListPage'
import { AllOrderListPage } from './Components/AllOrderListPage'
import { TermsandCondition } from './Components/TermsandCondition'
import { PrivacyPolicy } from './Components/PrivacyPolicy'

import { AddCategories } from './Components/AddCategories'
import { MobilesPage } from './Components/CategoryPages/MobilesPage'
import { AppliancesPage } from './Components/CategoryPages/AppliancesPage'
import { HomeDecorPage } from './Components/CategoryPages/HomeDecorPage'
import { ElectronicPage } from './Components/CategoryPages/ElectronicPage'
import { FashionPage } from './Components/CategoryPages/FashionPage'
import { FoodPage } from './Components/CategoryPages/FoodPage'
import { BeautyPage } from './Components/CategoryPages/BeautyPage'
import { BooksPage } from './Components/CategoryPages/BooksPage'
import { AutoMobilesPage } from './Components/CategoryPages/AutoMobilesPage'
import { ToursPage } from './Components/CategoryPages/ToursPage'
import { KitchenPage } from './Components/CategoryPages/KitchenPage'
import { SportsPage } from './Components/CategoryPages/SportsPage'
import { JewelleryPage } from './Components/CategoryPages/JewelleryPage';
import { OthersPage } from './Components/CategoryPages/OthersPage';
import { WalletPage } from './Components/WalletPage';
import Footer from './Components/Footer';

import Navbar from './Components/ProductCarousel/Navbar';

function App() {
  return (
    <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path='*' element={<Notfound />} />

        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />

        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />

        <Route path="/mobiles" element={<MobilesPage />} />
        <Route path="/appliances" element={<AppliancesPage />} />
        <Route path="/home-Decor" element={<HomeDecorPage />} />
        <Route path="/electronic" element={<ElectronicPage />} />
        <Route path="/fashion" element={<FashionPage />} />
        <Route path="/food" element={<FoodPage />} />
        <Route path="/beauty" element={<BeautyPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/automobiles" element={<AutoMobilesPage />} />
        <Route path="/tour" element={<ToursPage />} />
        <Route path="/kitchen" element={<KitchenPage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/jewellery" element={<JewelleryPage />} />
        <Route path="/others" element={<OthersPage />} />
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

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

