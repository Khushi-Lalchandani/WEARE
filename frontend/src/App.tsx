import { Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import AdminHeader from './components/AdminHeader'
import Home from './pages/Home'
import Search from './pages/Search'
import Cart from './pages/Cart'
import WishList from './pages/WishList'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import OrderSuccess from './pages/OrderSuccess'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import OrderDetails from './pages/OrderDetails'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import OrderList from './pages/admin/OrderList'
import ProductList from './pages/admin/ProductList'
import UserList from './pages/admin/UserList'
import ProductEdit from './pages/admin/ProductEdit'
import UserEdit from './pages/admin/UserEdit'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Men')
  const location = useLocation()
  const isProfilePage = location.pathname === '/profile'
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className={`h-screen w-[100%] overflow-y-auto scrollbar-hide ${isAdminRoute ? 'bg-gray-100' : ''}`}>
      {(!isProfilePage && !isAdminRoute) && <Header selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />}
      {(isAdminRoute && location.pathname !== '/admin') && <AdminHeader />}
      <Routes>
        {/* Public Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/" element={<Home selectedCategory={selectedCategory} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/wishlist" element={
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="/payment" element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } />
        <Route path="/order-success" element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        } />
        <Route path="/order/:id" element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/orders" element={
          <AdminRoute>
            <OrderList />
          </AdminRoute>
        } />
        <Route path="/admin/products" element={
          <AdminRoute>
            <ProductList />
          </AdminRoute>
        } />
        <Route path="/admin/product/:id/edit" element={
          <AdminRoute>
            <ProductEdit />
          </AdminRoute>
        } />
        <Route path="/admin/users" element={
          <AdminRoute>
            <UserList />
          </AdminRoute>
        } />
        <Route path="/admin/user/:id/edit" element={
          <AdminRoute>
            <UserEdit />
          </AdminRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
