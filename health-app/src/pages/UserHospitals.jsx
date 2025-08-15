import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserHospitals = () => {
  const [hospitals , setHospitals] = useState([])
  const [loading , setLoading] = useState(true)
  const [error , setError] = useState('')
  const email = localStorage.getItem('hospitalEmail')

  const navigate = useNavigate() 
  const editPage = () => {
    navigate('/addHospitals')
  }
  const hospitalAppointment = () => {
    navigate('/hosptitalAppointments')
  }

  useEffect(() => {
    const fetchHospitals = async () => {
      if (!email) {
        setError('User email not found');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:4000/api/hospitals/yourHospitals?email=${email}`)
        setHospitals(res.data.hospitalsUpoadedbyYou);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch hospitals');
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [email]);

  const deleteHospital = async (id) => {
  try {
    const confirm = window.confirm("Are you sure you want to delete this hospital?");
    if (!confirm) return;

    await axios.delete(`http://localhost:4000/api/hospitals/${id}`);
    alert('Hospital deleted successfully');

    // Refresh the list of hospitals after deletion
    setHospitals(prev => prev.filter(hospital => hospital._id !== id));
  } catch (err) {
    console.error(err);
    alert('Failed to delete hospital');
  }
};

if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-300 border-t-rose-500 mx-auto mb-4"></div>
        <p className="text-rose-600 text-lg font-medium animate-pulse">Loading your hospitals...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-200 max-w-md mx-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 font-medium text-lg">{error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Your Medical Empire
            </h2>
            <p className="text-pink-100 text-lg font-light max-w-2xl mx-auto">
              Manage your healthcare facilities with elegance and precision
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="text-white font-medium">YOU CAN ONLY ADD ONE HOSPITAL</span>
              </div>
              
              {/* Beautiful Appointment Button */}
              <button 
                onClick={hospitalAppointment}
className="bg-pink-200 text-brown font-bold py-4 px-8 rounded-2xl shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-lg font-extrabold tracking-wide">VIEW APPOINTMENTS</span>
                  <div className="animate-pulse">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/50 to-cyan-400/50 blur-xl group-hover:blur-2xl transition-all duration-300 -z-10"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {hospitals.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-xl p-12 border border-pink-200 max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-rose-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Hospitals Found</h3>
              <p className="text-gray-600 mb-8">Start building your healthcare network by adding your first hospital.</p>
              <button 
                onClick={editPage}
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Add Your First Hospital
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:gap-12">
            {hospitals.map((hospital, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Hospital Header */}
                <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-white mb-3">{hospital.name}</h3>
                      <div className="space-y-2 text-pink-100">
                        <p className="flex items-center">
                          <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {hospital.address}
                        </p>
                        <p className="flex items-center">
                          <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {hospital.contact}
                        </p>
                      </div>
                    </div>
                    {hospital.image && (
                      <div className="lg:w-48">
                        <img 
                          src={hospital.image} 
                          alt="Hospital" 
                          className="w-full h-32 lg:h-40 object-cover rounded-2xl shadow-lg border-4 border-white border-opacity-30"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Hospital Content */}
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-6 rounded-2xl border border-pink-200">
                        <h4 className="text-lg font-bold text-rose-800 mb-3 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Description
                        </h4>
                        <p className="text-gray-700 leading-relaxed">{hospital.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-6 rounded-2xl border border-pink-200">
                        <h4 className="text-lg font-bold text-rose-800 mb-3 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v1a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5h2a2 2 0 012 2v1a2 2 0 01-2 2h-2a2 2 0 01-2-2V7a2 2 0 012-2z" />
                          </svg>
                          Health Checkups
                        </h4>
                         <div className="text-gray-700 flex flex-col gap-1">
    {hospital.healthCheckups.map((checkup, index) => (
      <div key={index}>• {checkup}</div>
    ))}
  </div>
                      </div>

                      <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-6 rounded-2xl border border-pink-200">
                        <h4 className="text-lg font-bold text-rose-800 mb-3 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                          Diagnostic Services
                        </h4>
                       <div className="text-gray-700 flex flex-col gap-1">
  {hospital.diagnosticServices.map((service, index) => (
    <div key={index}>• {service}</div>
  ))}
</div>

                      </div>
                    </div>
                  </div>

                  {/* Doctors Section */}
                  {hospital.doctors && hospital.doctors.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-3 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Our Medical Team
                      </h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hospital.doctors.map((doc, i) => (
                          <div key={i} className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="text-center mb-4">
                              {doc.image && (
                                <img 
                                  src={doc.image} 
                                  alt={doc.name} 
                                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-pink-200 shadow-md"
                                />
                              )}
                              <h5 className="text-xl font-bold text-gray-800 mb-1">Dr. {doc.name}</h5>
                              <p className="text-rose-600 font-medium text-sm bg-pink-100 rounded-full px-3 py-1 inline-block">{doc.specialization}</p>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600">
                              <p><span className="font-semibold text-gray-800">Qualification:</span> {doc.qualification}</p>
                              <p><span className="font-semibold text-gray-800">Experience:</span> {doc.experience}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-pink-100">
                    <button 
                      onClick={editPage}
                      className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      EDIT HOSPITAL DETAILS
                    </button>
                    <button 
                      onClick={() => deleteHospital(hospital._id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      DELETE THE HOSPITAL
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHospitals
