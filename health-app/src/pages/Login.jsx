import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const  [login , setLogin] = useState(true)
  const [message , setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()
    try {
         localStorage.removeItem('selectedAddressId');
    localStorage.removeItem('selectedAddress');
      const endpoint = login ? '${import.meta.env.vite_backend_url}/api/userAuth/login' : '${import.meta.env.vite_backend_url}/api/userAuth/signup'
      const formData = login ? {email , password} : {name , email , password}
      const res = await axios.post(endpoint , formData)
   
      localStorage.setItem('token' , res.data.token)
      localStorage.setItem('userName' , res.data.userExist?.name || res.data.user?.name)
      localStorage.setItem('userEmail', res.data.userExist?.email || res.data.user?.email);
      localStorage.setItem("userId", res.data.user._id || res.data.userExist._id);

      setMessage(res.data.message)
      setName('')
      setEmail('')
      setPassword('')
      navigate('/')
      
    } catch (error) {
const errorMsg = error.response?.data?.message || 'An error occurred'
  setMessage(String(errorMsg))
  console.log(errorMsg)


    }
  }
    const toggleForm = () => {
    setLogin(!login)
    setMessage('')
    setName('')
    setEmail('')
    setPassword('')
  }
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-pink-300/20 to-rose-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-rose-300/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main container */}
      <div className="relative bg-white/40 backdrop-blur-lg border border-pink-200/50 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-pink-50/40 rounded-3xl"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Beautiful SVG illustration */}
            <div className="w-24 h-24 mx-auto mb-4">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Soft cloud-like shapes */}
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fce7f3" />
                    <stop offset="50%" stopColor="#f9a8d4" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fdf2f8" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
                
                {/* Peaceful mountain silhouette */}
                <path d="M20,120 Q60,80 100,100 Q140,70 180,90 L180,160 L20,160 Z" fill="url(#grad1)" opacity="0.8"/>
                <path d="M30,140 Q70,110 110,125 Q150,100 170,115 L170,160 L30,160 Z" fill="url(#grad2)" opacity="0.6"/>
                
                {/* Gentle sun */}
                <circle cx="150" cy="60" r="20" fill="#fce7f3" opacity="0.8"/>
                <circle cx="150" cy="60" r="15" fill="#f9a8d4" opacity="0.6"/>
                
                {/* Soft floating elements */}
                <circle cx="50" cy="50" r="8" fill="#fdf2f8" opacity="0.7"/>
                <circle cx="70" cy="40" r="6" fill="#f9a8d4" opacity="0.5"/>
                <circle cx="40" cy="65" r="5" fill="#ec4899" opacity="0.4"/>
                
                {/* Gentle wave at bottom */}
                <path d="M0,150 Q50,140 100,150 T200,150 L200,200 L0,200 Z" fill="#fdf2f8" opacity="0.3"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
              {login ? 'Welcome Back' : 'Join Us'}
            </h2>
            <p className="text-pink-600/70 mt-2">
              {login ? 'Sign in to your account' : 'Create your new account'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {login && (
              <div className="space-y-4">
                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 placeholder-pink-400/70 text-pink-800"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <div className="relative group">
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 placeholder-pink-400/70 text-pink-800"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            )}

            {!login && (
              <div className="space-y-4">
                <div className="relative group">
                  <input 
                    type="text" 
                    value={name} 
                    placeholder="Full Name" 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 placeholder-pink-400/70 text-pink-800"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 placeholder-pink-400/70 text-pink-800"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <div className="relative group">
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 placeholder-pink-400/70 text-pink-800"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            )}

            {/* Submit button */}
            <button 
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-white/50"
            >
              <span className="relative z-10">
                {login ? 'Sign In' : 'Create Account'}
              </span>
            </button>

            {/* Toggle form */}
            <div className="text-center">
              <p className="text-pink-600/80">
                {login ? "Don't have an account?" : 'Already have an account?'}{' '}
                <span 
                  onClick={toggleForm}
                  className="text-pink-600 font-semibold cursor-pointer hover:text-rose-600 transition-colors duration-300 underline decoration-pink-300 hover:decoration-rose-400"
                >
                  {login ? 'Sign up' : 'Login'}
                </span>
              </p>
            </div>

            {/* Message */}
            {message && (
              <div className="mt-4 p-3 bg-pink-50/80 border border-pink-200 rounded-lg">
                <p className="text-pink-700 text-sm text-center font-medium">{message}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
