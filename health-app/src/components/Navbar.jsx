import React, { useState } from 'react'
import { User, Heart, Calendar, LogOut, X, Settings, Bell, FileText, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    
    // Mock navigate function for demo
    const navigate = useNavigate()

    const loginpage = () => {
        navigate('/login')
    }
    const hospitalPage = () => {
      navigate('/hosptalLogin')
    }
    const profilePage = () => {
      navigate('/yourAppointment')
    }
    const handleLogout = () => {
         localStorage.removeItem('userEmail')
        navigate('/login')
        setSidebarOpen(false)
    }

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    const closeSidebar = () => {
        setSidebarOpen(false)
    }

  return (
    <>
      <div className='bg-gradient-to-r from-rose-50 to-pink-100 shadow-lg border-b border-pink-200 px-6 py-4'>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-md">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">MedCare</h1>
              <p className="text-xs text-gray-500">Healthcare Excellence</p>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <input 
              type="text" 
              placeholder='Search hospitals near you' 
              className="w-full px-6 py-3 bg-white border border-pink-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-200"
            />
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSidebar}
              className="w-10 h-10 bg-gradient-to-br from-pink-100 to-pink-200 hover:from-pink-200 hover:to-pink-300 rounded-full flex items-center justify-center shadow-sm border-2 border-white transition-all duration-200 transform hover:scale-105"
            >
              <User className="w-5 h-5 text-pink-600" />
            </button>
            
            <button 
              onClick={loginpage}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full font-medium shadow-sm transition-all duration-200 transform hover:scale-105"
            >
              login
            </button>
               <button 
              onClick={hospitalPage}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full font-medium shadow-sm transition-all duration-200 transform hover:scale-105"
            >
              Hospital login
            </button>
          </div>
          
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998] transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-red-500 p-6 relative">
          <button 
            onClick={closeSidebar}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex flex-col items-center text-white">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border-4 border-white/30">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-1">John Doe</h2>
            <p className="text-pink-100 text-sm">john.doe@example.com</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-6 space-y-3">
          
          {/* Your Appointments */}
          <button 
            onClick={profilePage}
            className="w-full bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 transform hover:scale-105 shadow-sm border border-rose-100 group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-red-400 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-rose-800 text-lg">Your Appointments</h3>
              <p className="text-rose-600 text-sm">Manage your bookings</p>
            </div>
            <ChevronRight className="w-5 h-5 text-rose-500 group-hover:text-rose-700 transition-colors duration-200" />
          </button>

          {/* Medical Records */}
          <button className="w-full bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 transform hover:scale-105 shadow-sm border border-rose-100 group">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-rose-800 text-lg">Medical Records</h3>
              <p className="text-rose-600 text-sm">View your history</p>
            </div>
            <ChevronRight className="w-5 h-5 text-rose-500 group-hover:text-rose-700 transition-colors duration-200" />
          </button>

          {/* Notifications */}
          <button className="w-full bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 transform hover:scale-105 shadow-sm border border-rose-100 group">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-400 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-rose-800 text-lg">Notifications</h3>
              <p className="text-rose-600 text-sm">Stay updated</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <ChevronRight className="w-5 h-5 text-rose-500 group-hover:text-rose-700 transition-colors duration-200" />
            </div>
          </button>

          {/* Settings */}
          <button className="w-full bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 transform hover:scale-105 shadow-sm border border-rose-100 group">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-400 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-rose-800 text-lg">Settings</h3>
              <p className="text-rose-600 text-sm">Account preferences</p>
            </div>
            <ChevronRight className="w-5 h-5 text-rose-500 group-hover:text-rose-700 transition-colors duration-200" />
          </button>

        </div>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <button 
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-32 -right-16 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 -right-8 w-20 h-20 bg-gradient-to-br from-red-200/20 to-pink-200/20 rounded-full blur-2xl"></div>
      </div>
    </>
  )
}

export default Navbar