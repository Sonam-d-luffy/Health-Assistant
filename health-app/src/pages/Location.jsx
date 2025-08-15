import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

import { MapPin, Plus, Trash2, Home } from 'lucide-react'


const Location = () => {
  const [address, setAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [currentAddressId, setCurrentAddressId] = useState(localStorage.getItem('selectedAddressId') || null);
  const [label, setLabel] = useState('');
  const email = localStorage.getItem('userEmail');

  const fetchAddresses = async() => {
    try {
      const res = await axios.get(`http://localhost:4000/api/location/all-addresses?email=${email}`)
      setAddresses(res.data.addresses)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(email){
      fetchAddresses()
    }else {
        setAddress('');
    setAddresses([]);
    setCurrentAddressId(null);
    setLabel('');
     localStorage.removeItem('selectedAddressId');
    localStorage.removeItem('selectedAddress');
    }
  // const clearOnUnload = () => {
  //   localStorage.removeItem('selectedAddressId');
  //   localStorage.removeItem('selectedAddress');
  // };

  // window.addEventListener('beforeunload', clearOnUnload);

  // return () => {
  //   window.removeEventListener('beforeunload', clearOnUnload);
  // };
    setCurrentAddressId(null);
  localStorage.removeItem('selectedAddressId');
  localStorage.removeItem('selectedAddress');
  fetchAddresses()
}, [email]);

  const handleAddAddress = async(e) => {
      e.preventDefault()
      if(!address.trim()) return
      try {
         await axios.post('http://localhost:4000/api/location/address', { email, address,label })
      
        setAddress('')
        await fetchAddresses()
      } catch (error) {
        console.error(error)
      }
  }

  const handleSelect = async(id) => {
    if(currentAddressId === id) return
    setCurrentAddressId(id)
    localStorage.setItem('selectedAddressId' , id)
      const selected = addresses.find((addr) => addr._id === id);
  if (selected) {
    localStorage.setItem('selectedAddress', JSON.stringify(selected)); // ✅ store full address
  }
       try {
         await axios.put(`http://localhost:4000/api/location/select-address?email=${email}`, { email, addressId: id });
    } catch (error) {
      console.error('Error setting current address:', error);
    }
  }
  const handleDelete = async (addressId) => {
  try {
    await axios.delete('http://localhost:4000/api/location/address', {
      params: {
        email,
        addressId
      }
    });
    await fetchAddresses(); // refresh after deletion
  } catch (error) {
    console.error('Failed to delete address', error);
  }
};

  useEffect(() => {
    if(email) {
     fetchAddresses()
    }
  } , [email])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full mb-4 shadow-lg">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Address Manager
          </h1>
          <p className="text-rose-600/70 text-lg">Manage your locations with ease</p>
        </div>

        {/* Add Address Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-rose-100 p-8 mb-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-rose-800">Add New Address</h2>
          </div>
          
          <div onSubmit={handleAddAddress} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-rose-700 uppercase tracking-wide">
                  Address Label
                </label>
                <div className="relative">
                  <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-rose-400" />
                  <input
                    type="text"
                    placeholder="e.g., Home, Office, Mom's Place"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-rose-50/50 border-2 border-rose-200 rounded-2xl focus:border-rose-400 focus:ring-4 focus:ring-rose-200/50 transition-all duration-200 text-rose-800 placeholder-rose-400"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-rose-700 uppercase tracking-wide">
                  Full Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-rose-400" />
                  <input
                    type="text"
                    placeholder="Enter complete address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-rose-50/50 border-2 border-rose-200 rounded-2xl focus:border-rose-400 focus:ring-4 focus:ring-rose-200/50 transition-all duration-200 text-rose-800 placeholder-rose-400"
                  />
                </div>
              </div>
            </div>
            
            <button 
              type="button"
              onClick={handleAddAddress}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <Plus className="w-5 h-5" />
              Add Address
            </button>
          </div>
        </div>

        {/* Saved Addresses */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-rose-100 p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-rose-800">Saved Addresses</h2>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-rose-400" />
              </div>
              <p className="text-rose-600/70 text-lg font-medium">No addresses found.</p>
              <p className="text-rose-500/60 text-sm mt-2">Add your first address to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((addr) => (
                <div 
                  key={addr._id}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                    currentAddressId === addr._id 
                      ? 'border-rose-400 bg-gradient-to-r from-rose-50 to-pink-50 shadow-md' 
                      : 'border-rose-200 bg-white/50 hover:border-rose-300'
                  }`}
                >
                  <div className="flex items-start gap-4 cursor-pointer">
                    <div className="flex items-center justify-center mt-1">
                      <input
                        type="radio"
                        name="selectedAddress"
                        checked={currentAddressId === addr._id}
                        onChange={() => handleSelect(addr._id)}
                        className="w-5 h-5 text-rose-500 border-2 border-rose-300 focus:ring-rose-400 focus:ring-2"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          currentAddressId === addr._id 
                            ? 'bg-gradient-to-r from-rose-400 to-pink-500' 
                            : 'bg-rose-200'
                        }`}>
                          <Home className={`w-4 h-4 ${
                            currentAddressId === addr._id ? 'text-white' : 'text-rose-600'
                          }`} />
                        </div>
                        <strong className="text-lg font-bold text-rose-800">
                          {addr.label || 'Unnamed'}
                        </strong>
                        {currentAddressId === addr._id && (
                          <span className="px-3 py-1 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xs font-bold rounded-full">
                            SELECTED
                          </span>
                        )}
                      </div>
                      <p className="text-rose-700 leading-relaxed pl-10">{addr.address}</p>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(addr._id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 bg-red-100 hover:bg-red-200 rounded-xl text-red-600 hover:text-red-700 transform hover:scale-110"
                      title="Delete address"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Location
