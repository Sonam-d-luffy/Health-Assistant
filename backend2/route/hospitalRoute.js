import express from 'express'
import Hospital from '../schema/hospitalSchema.js'
import axios from 'axios'
import dotenv from 'dotenv'
import User from '../schema/loginSchema.js'
import cloudinary from 'cloudinary'
dotenv.config()

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const router = express.Router()

// Generate signed upload
router.get("/cloudinary-signature", async (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.v2.utils.api_sign_request(
      { timestamp },
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      timestamp,
      signature,
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME
    });
  } catch (error) {
    console.error("Cloudinary signature error:", error);
    res.status(500).json({ message: "Could not generate signature" });
  }
});


router.post('/hospital', async (req, res) => {
  try {
    const {
      name,
      description,
      contact,
      address,
      image,
      healthCheckups,
      diagnosticServices,
      doctors,
      email,
      registrationNo
    } = req.body;

    if (!email || !address || !registrationNo) {
      return res.status(400).json({ message: 'Email and Address are required' });
    }

    const coords = await getCoords(address);

    // Check if hospital already exists
    const existingHospital = await Hospital.findOne({ email });

    if (existingHospital) {
      // Update existing hospital
      existingHospital.name = name || existingHospital.name;
      existingHospital.description = description || existingHospital.description;
      existingHospital.contact = contact || existingHospital.contact;
      existingHospital.address = address || existingHospital.address;
      existingHospital.location = coords || existingHospital.location;
      existingHospital.image = image || existingHospital.image;
      existingHospital.healthCheckups = healthCheckups || existingHospital.healthCheckups;
      existingHospital.diagnosticServices = diagnosticServices || existingHospital.diagnosticServices;
      existingHospital.doctors = doctors || existingHospital.doctors;
      existingHospital.registrationNo = registrationNo || existingHospital.registrationNo

      await existingHospital.save();
      return res.status(200).json({ message: 'Hospital info updated' });
    }

    // Create new hospital
    const newHospital = new Hospital({
      name,
      description,
      contact,
      address,
      location: coords,
      image,
      healthCheckups,
      diagnosticServices,
      doctors,
      email,
      registrationNo
    });

    await newHospital.save();
    res.status(201).json({ message: 'Hospital created' });

  } catch (error) {
    console.error('Error in POST /hospital:', error.message);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});
  

const getCoords= async(address) => {
    if(!address){
        throw new Error('Address is required')
    }
    const apiKey = process.env.api_key
    const url =  `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`
    try {
        const res = await axios.get(url)
        const data = res.data
        if(data.results.length > 0){
            const {lat , lng} = data.results[0].geometry
            return { latitude: lat, longitude: lng };

        } else {
            throw new Error('Address not found')
        }
    } catch (error) {
        throw new Error(`Geocoding Error : ${error.message}`)
    }
}
router.get('/yourHospitals' , async(req , res) => {
  try {
    const {email} = req.query
       if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const hospitals = await Hospital.find({email})
    
     if(!hospitals || hospitals.length === 0){
      return res.status(400).json({message : 'You have uploaded no hospitals'})
    }
    const hospitalsWithAddress = hospitals.filter(h => h.address && h.address.trim() !== '');
    if(hospitalsWithAddress.length === 0) {
      return res.status(404).json({message : 'No hospitals uploaded '})
    }
    return res.status(201).json({hospitalsUpoadedbyYou : hospitals})
  } catch (error) {
        console.error('Error fetching hospitals:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth’s radius in kilometers

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1Rad) * Math.cos(lat2Rad);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in km
}

router.get('/hospitalsNearYou', async (req, res) => {
  try {
    const { email, radius = 50 } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'User email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const selectedAddress = user.addresses.find(addr => addr.selected);
    if (!selectedAddress || !selectedAddress.location) {
      return res.status(400).json({ message: 'Selected address with location not found' });
    }

    const userLat = selectedAddress.location.latitude;
    const userLon = selectedAddress.location.longitude;

    const hospitals = await Hospital.find();
    const nearbyHospitals = hospitals.filter(h => {
      const distance = haversineDistance(
        userLat,
        userLon,
        h.location.latitude,
        h.location.longitude
      );
      return distance <= parseFloat(radius);
    });

    res.status(200).json({ hospitals: nearbyHospitals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.json({ message: 'Hospital deleted successfully', hospital });
  } catch (error) {
    console.error('Delete hospital error:', error);
    res.status(500).json({ message: 'Server error while deleting hospital' });
  }
});
router.get(('/:id') , async(req , res) => {
  try {
    const hospital = await Hospital.findById(req.params.id)
    if(!hospital){
      return res.status(404).json({message: 'Hospital not found'})
    }
    return res.status(200).json({hospitalInfo :hospital})
  } catch (error) {
     res.status(500).json({ message: 'Server error' });
  }
})

router.get(("/:hospitalId/departments") , async(req , res) => {
  try {
    const hospital = await Hospital.findById(req.params.hospitalId)
    if(!hospital) return res.status(400).json({message : 'No hospital found'})
      const departments = [...new Set(hospital.doctors.map(doc => doc.specialization))]
    if(!departments) return res.status(404).json({message : 'No doctors'})
      return res.status(201).json({departments})
  } catch (error) {
    return res.status(500).json({message : 'Server Error'})
  }
})

router.get(('/:hospitalId/doctors/:departments') , async(req , res) => {
  try {
    const {hospitalId , departments} = req.params
    const hospital = await Hospital.findById(hospitalId)
    if(!hospital) return res.status(400).json({message : 'No hospital found'})
    const doctors = hospital.doctors.filter(doc => doc.specialization === departments)
    if(!doctors) return res.status(400).json({message : 'Please select a department'})
      return res.status(201).json({doctors})
  } catch (error) {
    return res.status(500).json({message : 'Server Error'})
  }
})




export default router