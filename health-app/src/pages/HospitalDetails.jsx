import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const HospitalDetails = () => {
    const {id} = useParams()
    const [hospital , setHospital] = useState(null)
     const navigate = useNavigate()
  const appointmentPage = (id) => {
    navigate(`/appointmentPage/${hospital._id}`)
  }

    useEffect(() => {
        const fetchHospital = async() => {
            try {
                const res = await axios.get(`${import.meta.env.vite_backend_url}/api/hospitals/${id}`)
                setHospital(res.data.hospitalInfo)

            } catch (error) {
                console.error(error)
            }
        }
        fetchHospital()
    },[id])

    
    if (!hospital) return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-rose-500 border-t-transparent mb-4"></div>
                <div className="text-2xl font-light text-rose-600 tracking-wide">Loading...</div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Hospital Image Section */}
                {hospital.image && (
                    <div className="mb-12 animate-fadeIn">
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/80 backdrop-blur-sm border border-rose-200">
                            <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent z-10"></div>
                            <img 
                                src={hospital.image} 
                                alt={hospital.name} 
                                className="w-full h-96 object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute bottom-6 left-6 z-20">
                                <div className="text-sm font-medium text-white/90 tracking-widest uppercase mb-2">Medical Excellence</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Hospital Name */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl font-thin text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 mb-6 tracking-tight leading-tight">
                        {hospital.name}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-500 mx-auto rounded-full mb-8"></div>
                    
                    {/* Book Appointment Button */}
                    <div className="mt-8">
                        <button 
                            onClick={appointmentPage}
                            className="group relative inline-flex items-center justify-center px-12 py-4 overflow-hidden font-medium text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 rounded-full shadow-lg hover:shadow-2xl hover:from-rose-600 hover:via-pink-600 hover:to-rose-700 hover:scale-105 transform active:scale-95"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <svg 
                                className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-12" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="relative text-lg font-light tracking-wide">Book Appointment</span>
                        </button>
                        <p className="text-sm text-rose-600/70 mt-3 font-light">Schedule your visit with our expert medical team</p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Left Column - Basic Info */}
                    <div className="space-y-6">
                        {/* Description Card */}
                        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-rose-100 hover:shadow-2xl transition-all duration-300 hover:bg-white/80">
                            <div className="flex items-center mb-4">
                                <div className="w-2 h-8 bg-gradient-to-b from-rose-500 to-pink-600 rounded-full mr-4"></div>
                                <h3 className="text-2xl font-light text-rose-800 tracking-wide">About Us</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed font-light text-lg">{hospital.description}</p>
                        </div>

                        {/* Contact Card */}
                        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-rose-100 hover:shadow-2xl transition-all duration-300 hover:bg-white/80">
                            <div className="flex items-center mb-4">
                                <div className="w-2 h-8 bg-gradient-to-b from-rose-500 to-pink-600 rounded-full mr-4"></div>
                                <h3 className="text-2xl font-light text-rose-800 tracking-wide">Contact Information</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed font-light text-lg mb-4">{hospital.contact}</p>
                            <div className="pt-4 border-t border-rose-100">
                                <p className="text-gray-600 font-light"><span className="text-rose-600 font-medium">Address:</span> {hospital.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Services */}
                    <div className="space-y-6">
                        {/* Health Checkups Card */}
                        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-rose-100 hover:shadow-2xl transition-all duration-300 hover:bg-white/80">
                            <div className="flex items-center mb-4">
                                <div className="w-2 h-8 bg-gradient-to-b from-pink-500 to-rose-600 rounded-full mr-4"></div>
                                <h3 className="text-2xl font-light text-rose-800 tracking-wide">Health Checkups</h3>
                            </div>
                                            <div className="text-gray-700 flex flex-col gap-1">
    {hospital.healthCheckups.map((checkup, index) => (
      <div key={index}>• {checkup}</div>
    ))}
  </div>
                        </div>

                        {/* Diagnostic Services Card */}
                        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-rose-100 hover:shadow-2xl transition-all duration-300 hover:bg-white/80">
                            <div className="flex items-center mb-4">
                                <div className="w-2 h-8 bg-gradient-to-b from-pink-500 to-rose-600 rounded-full mr-4"></div>
                                <h3 className="text-2xl font-light text-rose-800 tracking-wide">Diagnostic Services</h3>
                            </div>
                                       <div className="text-gray-700 flex flex-col gap-1">
  {hospital.diagnosticServices.map((service, index) => (
    <div key={index}>• {service}</div>
  ))}
</div>
                        </div>
                    </div>
                </div>

                {/* Doctors Section */}
                <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-rose-100">
                    <div className="text-center mb-10">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-2 h-8 bg-gradient-to-b from-rose-500 to-pink-600 rounded-full mr-4"></div>
                            <h3 className="text-4xl font-thin text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 tracking-wide">Our Medical Team</h3>
                            <div className="w-2 h-8 bg-gradient-to-b from-pink-600 to-rose-500 rounded-full ml-4"></div>
                        </div>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-rose-400 to-pink-500 mx-auto rounded-full"></div>
                    </div>

                    {hospital.doctors && hospital.doctors.length > 0 ? (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {hospital.doctors.map((doctor, index) => (
                                <div key={index} className="group">
                                    <div className="bg-gradient-to-br from-white/80 to-rose-50/80 rounded-2xl p-6 shadow-lg border border-rose-100 hover:shadow-xl transition-all duration-300 hover:bg-white/90 hover:-translate-y-2">
                                        {doctor.image && (
                                            <div className="text-center mb-6">
                                                <div className="relative inline-block">
                                                    <img 
                                                        src={doctor.image} 
                                                        alt={doctor.name} 
                                                        className="w-24 h-24 object-cover rounded-full mx-auto shadow-lg border-4 border-white group-hover:border-rose-200 transition-all duration-300"
                                                    />
                                                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-rose-500/20 to-transparent"></div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="text-center space-y-3">
                                            <h4 className="text-xl font-medium text-rose-800 tracking-wide">{doctor.name}</h4>
                                            
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center justify-center">
                                                    <span className="text-rose-600 font-medium mr-2">Specialization:</span>
                                                    <span className="text-gray-700 font-light">{doctor.specialization}</span>
                                                </div>
                                                
                                                <div className="flex items-center justify-center">
                                                    <span className="text-rose-600 font-medium mr-2">Qualification:</span>
                                                    <span className="text-gray-700 font-light">{doctor.qualification}</span>
                                                </div>
                                                
                                                <div className="flex items-center justify-center">
                                                    <span className="text-rose-600 font-medium mr-2">Experience:</span>
                                                    <span className="text-gray-700 font-light">{doctor.experience}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-500 font-light text-lg">No doctors listed.</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HospitalDetails
