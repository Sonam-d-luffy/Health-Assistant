import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Hospitals = () => {
  const [hospitals , setHospitals] = useState([])
  const [loading , setLoading] = useState(true)
  const [error , setError] = useState('')
  const email = localStorage.getItem('userEmail')
  const navigate = useNavigate()
  const hospitalDetails = (id) => {
    navigate(`/hospitalDetails/${id}`)
  }

  useEffect(() => {
    const fetchHospitals = async() => {
      try {
        const res = await axios.get('${import.meta.env.VITE_BACKEND_URL}/api/hospitals/hospitalsNearYou' , {
          params: {email}
        })
        setHospitals(res.data.hospitals)
        setLoading(false)
      } catch (error) {
                console.error(error);
        setError('Could not fetch nearby hospitals.');
        setLoading(false)
      } finally{
        setLoading(false)
      }
    }

    if(email) {
      fetchHospitals()
    } else {
      setError('No user found')
    }
  },[email])

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-pink-300 border-t-rose-500 mx-auto mb-6"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-rose-600 text-xl font-semibold animate-pulse" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>
          Discovering hospitals near you...
        </p>
        <p className="text-pink-500 text-sm mt-2 font-light">Finding the perfect healthcare for you</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-10 border border-pink-200 max-w-lg mx-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Oops! Something went wrong</h3>
          <p className="text-red-600 font-medium text-lg">{error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-rose-500 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-32 w-48 h-48 bg-white bg-opacity-5 rounded-full blur-2xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h2 className="text-5xl font-black text-white mb-6 tracking-tight leading-tight">
              Nearby Hospitals
            </h2>
            <p className="text-pink-100 text-xl font-light max-w-3xl mx-auto leading-relaxed">
              Discover premium healthcare facilities in your area with world-class medical services and compassionate care
            </p>
            <div className="mt-8 flex justify-center">
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-full px-8 py-3 border border-white border-opacity-30">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-white font-semibold">{hospitals.length} Premium Facilities Found</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {hospitals.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-3xl shadow-2xl p-16 border border-pink-200 max-w-2xl mx-auto">
              <div className="w-28 h-28 bg-gradient-to-br from-pink-100 to-rose-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-14 h-14 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">No Hospitals Found</h3>
              <p className="text-gray-600 text-lg leading-relaxed">No hospitals found near your selected address. Try expanding your search radius or check back later.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {hospitals.map((hospital) => (
              <div key={hospital._id} className="group bg-white rounded-3xl shadow-xl overflow-hidden border border-pink-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105">
                {/* Hospital Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={hospital.image} 
                    alt={hospital.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Available 24/7
                    </div>
                  </div>
                </div>

                {/* Hospital Content */}
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-rose-600 transition-colors duration-300 leading-tight">
                      {hospital.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base line-clamp-3">
                      {hospital.description}
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-100 to-rose-200 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Contact</p>
                        <p className="text-gray-600 text-sm">{hospital.contact}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-100 to-rose-200 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Address</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{hospital.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm">
                      Book Appointment
                    </button>
                    <button onClick={() => hospitalDetails(hospital._id)} className="bg-white border-2 border-rose-200 hover:border-rose-300 text-rose-600 font-semibold py-3 px-4 rounded-xl hover:bg-rose-50 transition-all duration-300 text-sm">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Hospitals
