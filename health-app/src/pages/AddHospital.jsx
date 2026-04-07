import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddHospital = () => {
  const navigate = useNavigate()
  const yourHospitalPage = () => {
    navigate('/yourHospitals')
  }
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contact: '',
    address: '',
    image: '',
    healthCheckups: '',
    diagnosticServices: '',
    registrationNo: '',
    doctors: [{ name: '', specialization: '',  description: '',qualification: '', experience: '', image: '' }],
  });
  const [loading , setLoading] = useState(false)

  // Upload file to Cloudinary with signed request
  const handleFileUpload = async (file, field, doctorIndex = null) => {
    try {
      setLoading(true);

      // Step 1: Get signature from backend
      const { data: signData } = await axios.get("${import.meta.env.vite_backend_url}/api/hospitals/cloudinary-signature");
console.log(signData);

      // Step 2: Upload to Cloudinary
      const formDataCloud = new FormData();
        formDataCloud.append("file", file);
      formDataCloud.append("api_key", signData.api_key);
      formDataCloud.append("timestamp", signData.timestamp);
      formDataCloud.append("signature", signData.signature);
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${signData.cloud_name}/image/upload`,
        formDataCloud
      );

        const imageUrl = uploadRes.data.secure_url;

    // Step 3: Update state safely
  setFormData((prev) => {
      if (doctorIndex !== null && doctorIndex >= 0) {
        const updatedDoctors = [...prev.doctors];
        updatedDoctors[doctorIndex] = {
          ...updatedDoctors[doctorIndex],
          [field]: imageUrl
        };
        return { ...prev, doctors: updatedDoctors };
      }
      return { ...prev, [field]: imageUrl };
    });

  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
  } finally {
    setLoading(false);
  }
  };

 

  const handleDoctorChange = (i , field , value) => {
      const updatedDoctors = [...formData.doctors]
      updatedDoctors[i][field] = value
      setFormData({...formData , doctors:updatedDoctors})
  }

  const deleteDoctor = (i) => {
    const updatedDoctors = [...formData.doctors]
    updatedDoctors.splice(i ,1)
    setFormData({...formData , doctors : updatedDoctors})
  }
const addDoctor = () => {
  setFormData({
    ...formData,
    doctors: [...formData.doctors, { name: '', specialization: '', description: '', qualification: '', experience: '', image: '' }]
  })
}

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const email = localStorage.getItem('hospitalEmail');
  if (!email) {
    alert('Please log in as a hospital first');
    setLoading(false);
    return;
  }

  // 🔁 Convert comma-separated strings to arrays
  const healthCheckupsArray = formData.healthCheckups
    .split(',')
    .map(item => item.trim())
    .filter(item => item); // remove empty strings

  const diagnosticServicesArray = formData.diagnosticServices
    .split(',')
    .map(item => item.trim())
    .filter(item => item);

  try {
    await axios.post('${import.meta.env.vite_backend_url}/api/hospitals/hospital', {
      ...formData,
      email,
      healthCheckups: healthCheckupsArray,
      diagnosticServices: diagnosticServicesArray,
    });

    alert('Hospital added successfully!');
  setFormData(prev => ({
  ...prev,
  name: '',
  description: '',
  contact: '',
  address: '',
  image: '',
  healthCheckups: '',
  diagnosticServices: '',
  registrationNo:'',
  doctors: [{
    name: '',
    specialization: '',
    qualification: '',
    experience: '',
    description: '',
    image: ''
  }]
   
})
);
navigate('/yourHospitals')


  } catch (err) {
    alert('Error adding hospital');
    console.error(err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};


 
 return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Register Your Hospital
          </h1>
          <p className="text-rose-600/70 text-lg">Join our network of trusted healthcare providers</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-rose-100">
          <div className="space-y-8">
            
            {/* Hospital Information Section */}
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full mr-4"></div>
                <h2 className="text-2xl font-semibold text-rose-800">Hospital Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-rose-700">Hospital Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter hospital name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-rose-50/50 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 placeholder-rose-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-rose-700">Registration Number</label>
                  <input 
                    type="text" 
                    placeholder="Hospital registration number" 
                    value={formData.registrationNo} 
                    onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })} 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-rose-50/50 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 placeholder-rose-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-rose-700">Description</label>
                <input 
                  type="text" 
                  placeholder="Brief description of your hospital" 
                  value={formData.description} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-rose-50/50 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 placeholder-rose-400"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-rose-700">Contact</label>
                  <input 
                    type="text" 
                    placeholder="Phone number" 
                    value={formData.contact} 
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })} 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-rose-50/50 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 placeholder-rose-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-rose-700">Address</label>
                  <input 
                    type="text" 
                    placeholder="Complete address" 
                    value={formData.address} 
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })} 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-rose-50/50 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 placeholder-rose-400"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-rose-700">Health Checkups</label>
                  <input
                    type="text"
                    placeholder="General checkup, Blood test, etc. (comma separated)"
                    value={formData.healthCheckups}
                    onChange={(e) => setFormData({ ...formData, healthCheckups: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-rose-50/50 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 placeholder-rose-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-rose-700">Diagnostic Services</label>
                  <input
                    type="text"
                    placeholder="X-ray, MRI, CT scan, etc. (comma separated)"
                    value={formData.diagnosticServices}
                    onChange={(e) => setFormData({ ...formData, diagnosticServices: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-rose-50/50 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 placeholder-rose-400"
                  />
                </div>
              </div>

              {/* Hospital Image Upload */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-rose-700">Hospital Image</label>
                <div className="border-2 border-dashed border-rose-300 rounded-xl p-6 text-center bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 transition-all duration-300">
                  <input 
                    type="file" 
                    onChange={(e) => handleFileUpload(e.target.files[0], "image")} 
                    className="hidden" 
                    id="hospital-image"
                    accept="image/*"
                  />
                  <label htmlFor="hospital-image" className="cursor-pointer">
                    <div className="w-12 h-12 bg-rose-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-rose-600 font-medium">Click to upload hospital image</p>
                    <p className="text-rose-500 text-sm mt-1">PNG, JPG up to 10MB</p>
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-4">
                    <img src={formData.image} alt="Hospital" className="w-32 h-24 object-cover rounded-xl shadow-lg border-2 border-rose-200" />
                  </div>
                )}
              </div>
            </div>

            {/* Doctors Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-1 h-8 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-semibold text-rose-800">Medical Staff</h2>
                </div>
                <button 
                  type="button" 
                  onClick={addDoctor}
                  className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Doctor
                </button>
              </div>

              {formData.doctors.map((doc, i) => (
                <div key={i} className="bg-gradient-to-r from-white to-rose-50/50 rounded-2xl p-6 border border-rose-200 shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-rose-800">Doctor #{i + 1}</h3>
                    {formData.doctors.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => deleteDoctor(i)}
                        className="text-rose-500 hover:text-rose-700 transition-colors p-2 hover:bg-rose-100 rounded-full"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input 
                      type="text" 
                      placeholder="Doctor name" 
                      value={doc.name} 
                      onChange={(e) => handleDoctorChange(i, 'name', e.target.value)} 
                      className="px-4 py-3 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 placeholder-rose-400"
                    />
                    <input 
                      type="text" 
                      placeholder="Specialization" 
                      value={doc.specialization} 
                      onChange={(e) => handleDoctorChange(i, 'specialization', e.target.value)} 
                      className="px-4 py-3 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 placeholder-rose-400"
                    />
                    <input 
                      type="text" 
                      placeholder="Qualification" 
                      value={doc.qualification} 
                      onChange={(e) => handleDoctorChange(i, 'qualification', e.target.value)} 
                      className="px-4 py-3 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 placeholder-rose-400"
                    />
                    <input 
                      type="text" 
                      placeholder="Experience (e.g., 5 years)" 
                      value={doc.experience} 
                      onChange={(e) => handleDoctorChange(i, 'experience', e.target.value)} 
                      className="px-4 py-3 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 placeholder-rose-400"
                    />
                  </div>
                  
                  <input 
                    type="text" 
                    placeholder="Brief description about the doctor" 
                    value={doc.description} 
                    onChange={(e) => handleDoctorChange(i, 'description', e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 placeholder-rose-400 mb-4"
                  />

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input 
                        type="file" 
                        onChange={(e) => handleFileUpload(e.target.files[0], "image",i)} 
                        className="hidden"
                        id={`doctor-image-${i}`}
                        accept="image/*"
                      />
                      <label htmlFor={`doctor-image-${i}`} className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 rounded-xl hover:bg-rose-200 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Upload Photo
                      </label>
                    </div>
                    {doc.image && (
                      <img src={doc.image} alt="Doctor" className="w-16 h-16 object-cover rounded-full border-2 border-rose-200 shadow-md" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:from-rose-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Registering Hospital...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Register Hospital
                  </>
                )}
              </button>
              
              <button 
                onClick={yourHospitalPage}
                className="px-8 py-4 border-2 border-rose-400 text-rose-600 rounded-xl font-semibold hover:bg-rose-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                View Your Hospitals
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-rose-600/60">
          <p>© 2025 Healthcare Network. All rights reserved.</p>
        </div>
      </div>
    </div>
  );

}

export default AddHospital
