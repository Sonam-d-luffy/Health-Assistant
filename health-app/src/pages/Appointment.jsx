import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Calendar, Clock, User, Mail, Stethoscope, Building2, Heart, FileText, Users } from 'lucide-react'

const Appointment = () => {
  const {hospitalId} = useParams()
  const [user , setUser] = useState(null)
  const [doctors , setDoctors] = useState([])
  const [departments , setDepartments] = useState([])
  const [formdata , setFormdata] = useState({
   doctor: "",
    department: "",
    date: "",
    time: "",
    symptoms: "",
    gender: ""
  })
  const [message , setMessage] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    const name = localStorage.getItem('userName')

    if(!email || !name){
      navigate('/login')
    }
      
    setUser({email , name})
       const fetchDepartments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hospitals/${hospitalId}/departments`);
        setDepartments(res.data.departments || []);
      } catch (error) {
        console.error("Failed to fetch departments", error);
      }
    };
    fetchDepartments();

  }, [navigate , hospitalId])


    useEffect(() => {
    if (formdata.department) {
      const fetchDoctors = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hospitals/${hospitalId}/doctors/${formdata.department}`);
          setDoctors(res.data.doctors || []);
        } catch (error) {
          console.error("Failed to fetch doctors", error);
        }
      };
      fetchDoctors();
    } else {
      setDoctors([]);
    }
  }, [formdata.department, hospitalId]);

  const handleChange = (e) => {
      setFormdata({...formdata , [e.target.name] : e.target.value})
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        if (!formdata.doctor || !formdata.department || !formdata.date || !formdata.time) {
      setMessage("Please fill all required field");
      return;
    }
     const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/appointments/book` , {
        ...formdata,

  hospitalId,
  email: user.email,
  name: user.name,
   userId: localStorage.getItem("userId"),
      })

      setMessage(res.data.message)

         setFormdata({
        doctor: "",
        department: "",
        date: "",
        time: "",
        symptoms: "",
        gender: ""
      });
      navigate('/')
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong")
    }
  }
 return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-rose-500 to-red-500 p-3 rounded-full shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent mb-2">
            Book Your Appointment
          </h1>
          <p className="text-rose-600 text-lg font-medium">
            Schedule your visit with our expert medical professionals
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl shadow-md ${
            message.includes('successfully') 
              ? 'bg-green-50 border-l-4 border-green-400 text-green-700' 
              : 'bg-red-50 border-l-4 border-red-400 text-red-700'
          }`}>
            <p className="font-medium">{message}</p>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 p-8">
          <div className="space-y-6">
            {/* User Info Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-rose-700 font-semibold text-sm uppercase tracking-wide">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={user?.email || ''} 
                    disabled 
                    className="w-full px-4 py-3 pl-11 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 font-medium focus:outline-none"
                  />
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-rose-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-rose-700 font-semibold text-sm uppercase tracking-wide">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={user?.name || ''} 
                    disabled 
                    className="w-full px-4 py-3 pl-11 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 font-medium focus:outline-none"
                  />
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-rose-400" />
                </div>
              </div>
            </div>

            {/* Department and Doctor Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-rose-700 font-semibold text-sm uppercase tracking-wide">
                  <Building2 className="w-4 h-4" />
                  Department *
                </label>
                <div className="relative">
                  <select
                    name="department"
                    value={formdata.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-11 bg-white border-2 border-rose-200 rounded-xl text-rose-800 font-medium focus:border-rose-400 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <Building2 className="absolute left-3 top-3.5 w-5 h-5 text-rose-400" />
                  <div className="absolute right-3 top-3.5 w-5 h-5 text-rose-400 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-rose-700 font-semibold text-sm uppercase tracking-wide">
                  <Stethoscope className="w-4 h-4" />
                  Doctor *
                </label>
                <div className="relative">
                  <select
                    name="doctor"
                    value={formdata.doctor}
                    onChange={handleChange}
                    disabled={!formdata.department}
                    className="w-full px-4 py-3 pl-11 bg-white border-2 border-rose-200 rounded-xl text-rose-800 font-medium focus:border-rose-400 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-all duration-200 appearance-none cursor-pointer disabled:bg-rose-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc, index) => (
                      <option key={index} value={doc.name}>{doc.name}</option>
                    ))}
                  </select>
                  <Stethoscope className="absolute left-3 top-3.5 w-5 h-5 text-rose-400" />
                  <div className="absolute right-3 top-3.5 w-5 h-5 text-rose-400 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Date and Time Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-rose-700 font-semibold text-sm uppercase tracking-wide">
                  <Calendar className="w-4 h-4" />
                  Appointment Date *
                </label>
                <div className="relative">
                  <input 
                    type="date" 
                    name="date" 
                    value={formdata.date} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-11 bg-white border-2 border-rose-200 rounded-xl text-rose-800 font-medium focus:border-rose-400 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-all duration-200"
                  />
                  <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-rose-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-rose-700 font-semibold text-sm uppercase tracking-wide">
                  <Clock className="w-4 h-4" />
                  Preferred Time *
                </label>
                <div className="relative">
                  <input 
                    type="time" 
                    name="time" 
                    value={formdata.time} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-11 bg-white border-2 border-rose-200 rounded-xl text-rose-800 font-medium focus:border-rose-400 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-all duration-200"
                  />
                  <Clock className="absolute left-3 top-3.5 w-5 h-5 text-rose-400" />
                </div>
              </div>
            </div>

            {/* Gender Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-rose-700 font-semibold text-sm uppercase tracking-wide">
                <Users className="w-4 h-4" />
                Gender
              </label>
              <div className="relative">
                <select 
                  name="gender" 
                  value={formdata.gender} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-11 bg-white border-2 border-rose-200 rounded-xl text-rose-800 font-medium focus:border-rose-400 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <Users className="absolute left-3 top-3.5 w-5 h-5 text-rose-400" />
                <div className="absolute right-3 top-3.5 w-5 h-5 text-rose-400 pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Symptoms Text Area */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-rose-700 font-semibold text-sm uppercase tracking-wide">
                <FileText className="w-4 h-4" />
                Symptoms & Notes
              </label>
              <div className="relative">
                <textarea 
                  name="symptoms" 
                  value={formdata.symptoms} 
                  onChange={handleChange}
                  rows="4"
                  placeholder="Please describe your symptoms or any additional information..."
                  className="w-full px-4 py-3 pl-11 bg-white border-2 border-rose-200 rounded-xl text-rose-800 font-medium focus:border-rose-400 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-all duration-200 resize-none"
                />
                <FileText className="absolute left-3 top-3.5 w-5 h-5 text-rose-400" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 text-lg"
              >
                <Heart className="w-6 h-6" />
                Book Appointment
                <Calendar className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-rose-600 text-sm">
            Need help? Contact our support team for assistance with your appointment booking.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Appointment
