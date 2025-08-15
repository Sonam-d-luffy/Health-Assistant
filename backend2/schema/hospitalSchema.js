// models/Hospital.js
import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: String,
  qualification: String,
  experience: String,
  description:String,
  image: String // URL (Cloudinary or similar)
})

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  contact: {
    type:String
  },
  registrationNo : {
    type: String,
  },
  email:{
    type:String,
    required: true,
    unique:true
  },
  password:{
    type:String,
    required: false
  },
  address: {
    type:String
  },
  location: {
    latitude: { type: Number, },
    longitude: { type: Number,}
  },
  image: String, // hospital image (Cloudinary URL)
healthCheckups: { type: [String], default: [] },
diagnosticServices: { type: [String], default: [] },
doctors: { type: [doctorSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Hospital', hospitalSchema)
