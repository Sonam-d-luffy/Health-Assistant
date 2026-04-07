import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Calendar, Clock, User, Mail, Stethoscope, Building2, CheckCircle, XCircle, UserCheck, Heart, Activity, RefreshCw } from 'lucide-react'

const HospitalAppointments = () => {
    const [appointments , setAppointments] = useState([])
    const [loading , setLoading] = useState(false)

    const hospitalId = localStorage.getItem('hospitalId')
       const fetchAppointments = async() => {
            setLoading(true)
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/appointments/hospital/${hospitalId}`)
                setAppointments(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                  alert(error.response?.data?.message || 'Failed to load appointments');
            } finally{
                setLoading(false)
            }
        }

    useEffect(() => {
     
        if(hospitalId) {
            fetchAppointments()
        }
    },[hospitalId])

      const updateStatus = async (id, status) => {
    if (!window.confirm(`Are you sure you want to mark this appointment as "${status}"?`)) return;
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/appointments/${id}`, { status });
      alert(res.data.message);
      fetchAppointments(); // refresh list
    } catch (error) {
      console.error(error);
      alert('Failed to update status');
    }
  };


    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center min-h-[500px]">
                        <div className="text-center">
                            <div className="relative mb-8">
                                <div className="animate-spin rounded-full h-20 w-20 border-4 border-rose-200 border-t-rose-500 mx-auto"></div>
                                <Activity className="absolute inset-0 m-auto h-8 w-8 text-rose-400 animate-pulse" />
                            </div>
                            <h3 className="text-2xl font-bold text-rose-700 mb-2">Loading Appointments</h3>
                            <p className="text-rose-600">Fetching the latest appointment data...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-8">
                        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 p-6 rounded-full shadow-2xl">
                            <Building2 className="h-10 w-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 mb-4">
                        Hospital Appointments Dashboard
                    </h1>
                    <p className="text-rose-700 text-xl max-w-3xl mx-auto leading-relaxed">
                        Manage patient appointments with precision and care. Your commitment to health starts here.
                    </p>
                    
                    {/* Stats Bar */}
                    <div className="mt-8 flex flex-wrap justify-center gap-6">
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-rose-100">
                            <div className="flex items-center space-x-3">
                                <Calendar className="h-6 w-6 text-rose-500" />
                                <div>
                                    <p className="text-2xl font-bold text-rose-800">{appointments.length}</p>
                                    <p className="text-rose-600 text-sm font-medium">Total Appointments</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-green-100">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="h-6 w-6 text-green-500" />
                                <div>
                                    <p className="text-2xl font-bold text-green-800">
                                        {appointments.filter(a => a.status === 'Completed').length}
                                    </p>
                                    <p className="text-green-600 text-sm font-medium">Completed</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-yellow-100">
                            <div className="flex items-center space-x-3">
                                <Clock className="h-6 w-6 text-yellow-500" />
                                <div>
                                    <p className="text-2xl font-bold text-yellow-800">
                                        {appointments.filter(a => !a.status || a.status === 'Pending').length}
                                    </p>
                                    <p className="text-yellow-600 text-sm font-medium">Pending</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                {appointments.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="mb-8">
                            <Heart className="h-32 w-32 text-rose-300 mx-auto mb-8" />
                            <h2 className="text-4xl font-bold text-rose-800 mb-4">No Appointments Yet</h2>
                            <p className="text-rose-600 text-xl max-w-md mx-auto">
                                Your appointment schedule is clear. New patient bookings will appear here.
                            </p>
                        </div>
                        <button 
                            onClick={fetchAppointments}
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                        >
                            <RefreshCw className="h-5 w-5" />
                            <span>Refresh</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {appointments.map(app => (
                            <div 
                                key={app._id}
                                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-rose-100 overflow-hidden"
                            >
                                {/* Card Header */}
                                <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-white/20 p-2 rounded-full">
                                                <UserCheck className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">{app.userId.name}</h3>
                                                <p className="text-rose-100 text-sm">{app.userId.email}</p>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            app.status === 'Completed' ? 'bg-green-500/20 text-green-100 border border-green-400' :
                                            app.status === 'Cancelled' ? 'bg-red-500/20 text-red-100 border border-red-400' :
                                            'bg-yellow-500/20 text-yellow-100 border border-yellow-400'
                                        }`}>
                                            {app.status || 'Pending'}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                    {/* Patient Info */}
                                    <div className="mb-6">
                                        <div className="flex items-center mb-3">
                                            <User className="h-5 w-5 text-rose-500 mr-3" />
                                            <div>
                                                <span className="text-xs text-rose-600 font-semibold uppercase tracking-wider">Patient</span>
                                                <p className="text-gray-800 font-bold text-lg">{app.userId.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Mail className="h-4 w-4 text-rose-400 mr-3" />
                                            <p className="text-gray-600 text-sm">{app.userId.email}</p>
                                        </div>
                                    </div>

                                    {/* Appointment Details */}
                                    <div className="space-y-4 mb-6">
                                        <div className="bg-rose-50 rounded-2xl p-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 text-rose-500 mr-2" />
                                                    <div>
                                                        <span className="text-xs text-rose-600 font-medium uppercase">Date</span>
                                                        <p className="text-gray-800 font-semibold">{app.date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 text-rose-500 mr-2" />
                                                    <div>
                                                        <span className="text-xs text-rose-600 font-medium uppercase">Time</span>
                                                        <p className="text-gray-800 font-semibold">{app.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-pink-50 rounded-2xl p-4">
                                            <div className="flex items-center mb-2">
                                                <Stethoscope className="h-4 w-4 text-pink-500 mr-2" />
                                                <span className="text-xs text-pink-600 font-medium uppercase">Medical Details</span>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2">
                                                <div>
                                                    <span className="text-xs text-pink-600 font-medium">Doctor:</span>
                                                    <p className="text-gray-800 font-semibold">{app.doctor}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-pink-600 font-medium">Department:</span>
                                                    <p className="text-gray-800 font-semibold">{app.department}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <button 
                                            onClick={() => updateStatus(app._id, 'Completed')}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                                        >
                                            <CheckCircle className="h-4 w-4" />
                                            <span>Complete</span>
                                        </button>
                                        <button 
                                            onClick={() => updateStatus(app._id, 'Cancelled')}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-rose-500 text-white py-3 rounded-xl hover:from-red-600 hover:to-rose-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                                        >
                                            <XCircle className="h-4 w-4" />
                                            <span>Cancel</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="text-center mt-16 pt-8 border-t border-rose-200">
                    <p className="text-rose-600 text-sm flex items-center justify-center space-x-2">
                        <Heart className="h-4 w-4" />
                        <span>Dedicated to exceptional patient care</span>
                        <Heart className="h-4 w-4" />
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HospitalAppointments
