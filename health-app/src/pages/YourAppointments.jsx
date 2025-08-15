import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Calendar, Clock, MapPin, User, Stethoscope, Building2, Trash2, Heart } from 'lucide-react'

const YourAppointments = () => {
  const [appointments , setAppointments] = useState([])
  const [loading , setLoading] = useState(true)
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    const fetchapp = async() => {
      try {
        const res = await axios.get(`http://localhost:4000/api/appointments/user/${userId}`)
        setAppointments(res.data)
      } catch (error) {
        console.log(error)
        setAppointments({})
      }finally{
        setLoading(false)
      }

    }

    if(userId){
      fetchapp()
    }
  },[userId])

  const deleteAppointment = async (id) => {
      const confirmed = window.confirm("Are you sure you want to delete this appointment?");
  if (!confirmed) return;
  try {
    await axios.delete(`http://localhost:4000/api/appointments/${id}`);
    setAppointments(prev => prev.filter(a => a._id !== id)); // remove from state
  } catch (error) {
    console.error("Error deleting appointment:", error);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-rose-200 border-t-rose-500 mx-auto mb-4"></div>
              <p className="text-rose-600 text-lg font-medium">Loading your appointments...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-16">
            <div className="mb-8">
              <Heart className="h-24 w-24 text-rose-300 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-rose-800 mb-4">No Appointments Yet</h2>
              <p className="text-rose-600 text-lg">Your health journey starts with booking your first appointment.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-rose-500 to-red-500 p-4 rounded-full shadow-lg">
              <Calendar className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-red-600 mb-4">
            Your Health Appointments
          </h1>
          <p className="text-rose-600 text-lg max-w-2xl mx-auto">
            Manage your upcoming medical appointments with ease and stay on top of your health journey.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-full px-6 py-2 shadow-sm">
              <span className="text-rose-700 font-medium">{appointments.length} Appointment{appointments.length !== 1 ? 's' : ''} Scheduled</span>
            </div>
          </div>
        </div>

        {/* Appointments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((a) => (
            <div 
              key={a._id} 
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border border-rose-100"
            >
              {/* Hospital Image */}
              {a.hospitalId.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={a.hospitalId.image}
                    alt={a.hospitalId.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}

              {/* Card Content */}
              <div className="p-6">
                {/* Hospital Info */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Building2 className="h-5 w-5 text-rose-500 mr-2 flex-shrink-0" />
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">{a.hospitalId.name}</h3>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-rose-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600 text-sm leading-relaxed">{a.hospitalId.address}</p>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-rose-500 mr-3 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-rose-600 font-medium uppercase tracking-wide">Doctor</span>
                      <p className="text-gray-800 font-medium">{a.doctor}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Stethoscope className="h-4 w-4 text-rose-500 mr-3 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-rose-600 font-medium uppercase tracking-wide">Department</span>
                      <p className="text-gray-800 font-medium">{a.department}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-rose-500 mr-3 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-rose-600 font-medium uppercase tracking-wide">Date</span>
                      <p className="text-gray-800 font-medium">{a.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-rose-500 mr-3 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-rose-600 font-medium uppercase tracking-wide">Time</span>
                      <p className="text-gray-800 font-medium">{a.time}</p>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-rose-100">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    a.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    a.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {a.status || "Pending"}
                  </div>

                  <button 
                    onClick={() => deleteAppointment(a._id)}
                    className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:from-red-600 hover:to-rose-600 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-rose-200">
          <p className="text-rose-600 text-sm">
            Take care of your health • Stay updated with your appointments
          </p>
        </div>
      </div>
    </div>
  );
}

export default YourAppointments
