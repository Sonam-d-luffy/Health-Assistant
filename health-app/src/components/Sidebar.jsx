import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Plus, Navigation } from 'lucide-react'

const Sidebar = () => {
  const [address , setAddress] = useState()
  const email = localStorage.getItem('userEmail')
  const addAddress = async(e) => {
       try {
        const res = await axios.get(`http://localhost:4000/api/location/selected-address?email=${email}`)
        if(res.data && res.data.address){
          setAddress(res.data.address)
        }
      
       } catch (error) {
        console.error.error
       }
  }
useEffect(() => {
  const stored = localStorage.getItem('selectedAddress');
   if (stored) {
      const parsed = JSON.parse(stored);
      setAddress(parsed.address); // you only need the address string
    }
}, []);
    const navigate = useNavigate()
    const addressPage = () => {
        navigate('/addressPage')
    }
  return (
   <nav className="bg-gradient-to-r from-rose-200 via-pink-200 to-rose-300 shadow-lg border-b-2 border-rose-200/30 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo/Brand Section */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Selected Location
            </span>
          </div>

          {/* Address Section */}
          <div className="flex-1 max-w2xl mx-8">
            {address ? (
              <div className="bg-white/70 backdrop-blur-sm rounded-full px-6 py-2 shadow-md border border-rose-200/50 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-rose-800 truncate">
                    </p>
                    <p className="text-sm text-rose-600 truncate font-semibold">
                      📍 {address}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-md border border-rose-200/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-rose-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-rose-500" />
                  </div>
                  <p className="text-sm text-rose-600 font-medium">
                    No address selected
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Add Address Button */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={addressPage}
              className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-rose-400/20"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Address
            </button>
          </div>

          {/* Mobile Menu Button (Optional) */}
          <div className="md:hidden">
            <button className="p-2 rounded-full bg-rose-100 hover:bg-rose-200 transition-colors duration-200">
              <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Optional: Mobile Address Display */}
      <div className="md:hidden bg-gradient-to-r from-rose-100/50 to-pink-100/50 px-4 py-3 border-t border-rose-200/30">
        {address ? (
          <div className="bg-white/80 rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-rose-700 mb-1">Selected Location :</p>
                <p className="text-sm text-rose-800 font-semibold">
                  📍 {address}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/80 rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <p className="text-sm text-rose-600 font-medium">
                No address selected
              </p>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Sidebar
