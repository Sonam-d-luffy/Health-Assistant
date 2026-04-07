import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

// Mock Navbar component for demo


const Home = () => {
  // Mock navigation functions
  const navigate = useNavigate()

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const diseasepage = () => {
    navigate('/disease')
  }
  
  const avpage = () => {
    navigate('/treatment')
  }
  
  const hospitals = () => {
    navigate('/hospitals')
  }
  
  const health = () => {
    navigate('/health')
  }

  const services = [
    {
      title: "Disease Prediction",
      description: "Select your symptoms and get alerted about what disease you can have",
      icon: "🔬",
      onClick: diseasepage,
      gradient: "from-blue-400 to-blue-600"
    },
    {
      title: "Disease Treatment",
      description: "Traditional healing wisdom and natural remedies for holistic wellness",
      icon: "🌿",
      onClick: avpage,
      gradient: "from-green-400 to-green-600"
    },
    {
      title: "Hospital Directory",
      description: "Find the best hospitals and medical facilities near you",
      icon: "🏥",
      onClick: hospitals,
      gradient: "from-gray-400 to-gray-600"
    },
    {
      title: "About Us",
      description: " Whether you need urgent hospital access, a quick disease prediction, or treatment recommendations, ",
      icon: "❤️",
      onClick: health,
      gradient: "from-rose-400 to-rose-600"
    }
  ]

  return (
    <>
      <Navbar/>
      <Sidebar/>


      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
  
  .playfair { font-family: 'Playfair Display', serif; }
  .inter { font-family: 'Inter', sans-serif; }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(15px, -15px) rotate(5deg); }
    50% { transform: translate(-10px, -25px) rotate(-5deg); }
    75% { transform: translate(20px, -10px) rotate(3deg); }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(244, 63, 94, 0.1); }
    50% { box-shadow: 0 0 40px rgba(244, 63, 94, 0.2), 0 0 60px rgba(244, 63, 94, 0.1); }
  }

  @keyframes pulse-glow {
    0%, 100% { background-size: 100% 100%; }
    50% { background-size: 110% 110%; }
  }

  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-glow { animation: glow 3s ease-in-out infinite; }
  .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
`}</style>


      
      {/* Main Container */}
      <div className="min-h-screen bg-gradient-to-br from-rose-50/30 via-pink-50/20 to-gray-50 relative overflow-hidden">
        
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-rose-100/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 right-16 w-96 h-96 bg-pink-100/25 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-rose-50/40 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        {/* Floating Medical Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-8 text-4xl text-gray-200 animate-float">⚕️</div>
          <div className="absolute top-40 right-12 text-3xl text-gray-200 animate-float delay-1000">💉</div>
          <div className="absolute bottom-40 left-20 text-3xl text-gray-200 animate-float delay-2000">🩺</div>
          <div className="absolute bottom-32 right-8 text-4xl text-gray-200 animate-float delay-500">💊</div>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 pt-20 pb-12">
          <div className="container mx-auto px-6">
            
            {/* Main Title Section */}
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="backdrop-blur-2xl bg-white/80 border border-rose-200/30 rounded-3xl p-12 shadow-2xl mx-auto max-w-4xl relative overflow-hidden">
                
                {/* Subtle inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-transparent to-pink-50/30 rounded-3xl pointer-events-none" />
                
                <div className="relative z-10">
                  <h1 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent leading-tight playfair tracking-tight">
                    Find Best Medical Assistance
                  </h1>
                  
                  <p className="text-gray-600 text-lg md:text-xl mb-8 inter font-light tracking-wide leading-relaxed max-w-2xl mx-auto">
                    Experience premium healthcare services with elegance and sophistication
                  </p>
                
                  <button 
                  onClick={hospitals}
                    className="group relative inline-flex items-center px-12 py-5 text-lg font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 rounded-full hover:from-rose-600 hover:via-pink-700 hover:to-rose-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden inter tracking-widest"
                  >
                    <span className="relative z-10 uppercase">Get Started</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-400/20 to-pink-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </button>
                </div>

                {/* Decorative elements around glass card */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-rose-400/30 to-pink-500/30 rounded-full animate-pulse" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-br from-pink-400/40 to-rose-500/40 rounded-full animate-pulse delay-1000" />
                <div className="absolute top-8 -right-8 w-6 h-6 bg-gradient-to-br from-rose-300/50 to-pink-400/50 rounded-full animate-pulse delay-500" />
              </div>
            </div>

            {/* Services Section */}
            <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-pink-500 playfair tracking-tight">
                We Provide You The Best Assistance
              </h2>
              <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto inter font-light leading-relaxed tracking-wide">
                Choose from our comprehensive range of medical services designed to meet all your healthcare needs with unparalleled elegance
              </p>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={service.onClick}
                  className={`group cursor-pointer transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                  <div className="backdrop-blur-xl bg-white/85 border border-rose-200/40 rounded-2xl p-8 hover:bg-white/95 transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 shadow-lg hover:shadow-2xl h-full relative overflow-hidden group">
                    
                    {/* Subtle card glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-rose-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={`text-6xl mb-6 bg-gradient-to-br ${service.gradient} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <span className="filter drop-shadow-lg">{service.icon}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300 playfair tracking-wide">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 inter font-light tracking-wide">
                        {service.description}
                      </p>

                      {/* Hover arrow */}
                      <div className="mt-6 flex justify-center opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                        <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center text-white text-lg shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
                          →
                        </div>
                      </div>
                    </div>

                    {/* Card glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-2xl`} />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom decorative elements */}
            <div className="mt-16 flex justify-center space-x-4">
              <div className="w-3 h-3 bg-rose-400 rounded-full animate-ping delay-0" />
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping delay-300" />
              <div className="w-4 h-4 bg-red-400 rounded-full animate-ping delay-600" />
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping delay-900" />
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-rose-50/50 to-transparent pointer-events-none" />
      </div>
    </>
  )
}

export default Home