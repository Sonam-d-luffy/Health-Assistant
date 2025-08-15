import mongoose from "mongoose";
import axios from 'axios'
import User from "../schema/loginSchema.js";
import dotenv from 'dotenv'
import express from 'express'
dotenv.config()
const router = express.Router()

const getCoords = async (address) => {
  if (!address) {
    throw new Error('Address is required');
  }

  const apiKey = process.env.api_key;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const res = await axios.get(url);
    const data = res.data;

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { latitude: lat, longitude: lng }; 
    } else {
      throw new Error('Address not found');
    }
  } catch (error) {
    throw new Error(`Geocoding Error: ${error.message}`);
  }
};


router.post('/address' , async(req , res) => {
    const { email ,address,makeSelected ,label} = req.body 
    if(!address) {
        res.status(400).json({message: 'Add Address'})
    }
    try {
        const coords = await getCoords(address)
        const user = await User.findOne({email})
        if(!user) {
            res.status(400).json({message: 'No user exists'})
        }if(makeSelected){
            user.addresses.forEach(a => a.selected=false)
        }
        user.addresses.push({
            address,location:coords,selected:makeSelected,label
        })
        await user.save()
        res.status(201).json({message : 'Address saved'})
    } catch (error) {
     console.error('Error adding address:', error);
    res.status(500).json({ error: 'Server error' });
    }

})
router.put('/select-address' , async(req, res) => {
    const {email , addressId} = req.body
    if(!email || !addressId) {
        res.status(400).json({message : 'AddressId required'})
    }
    try {
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json({message : 'No User'})
        }
        let found = false
        user.addresses.forEach(a => {
            if(a._id.toString()===addressId) {
                a.selected=true,
                found=true
            }else{
                a.selected = false
            }

        })
        if(!found){
            res.status(404).json({message: 'Address not found'})
        }
        await user.save()
        return res.status(201).json({adresses : user.addresses})
    } catch (error) {
        res.status(500).json({message : 'Srever Error'})
    }
})
router.get('/selected-address' , async(req , res) => {
    try {
            const {email} = req.query
    if(!email) {
        res.status(400).json({message : 'No address'})
    }
    const user = await User.findOne({email})
    if(!user || !user.addresses) {
        res.status(400).json({message : 'No user'})
    }
    const selectedAdd = user.addresses.find(addr => addr.selected === true)
    if(!selectedAdd){
        req.status(404).json({message:'No selected address'})
    }
    res.status(201).json({selectedAddress : selectedAdd})
    } catch (error) {
        res.status(500).json({message : 'Srever error'})
    }

})
router.get('/all-addresses' , async(req , res) => {
    const {email} = req.query
    try {
        const user = await User.findOne({email})
        if(!user || !user.addresses){
            res.status(404).json({message: 'No user or address'})
        }
        res.status(201).json({message : 'address found' , addresses : user.addresses})
    } catch (error) {
        res.status(500).json({message : 'Server Error'})
    }
})
router.delete('/address', async (req, res) => {
  try {
    const { email, addressId } = req.query;

    if (!email || !addressId) {
      return res.status(400).json({ error: 'Email and addressId are required' });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { addresses: { _id: addressId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Address deleted', addresses: user.addresses });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
export default router