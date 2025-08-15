import express from 'express'
import Appointment from "../schema/appointmentSchema.js";

const router = express.Router()

router.post('/book' ,async(req , res) => {
   
    try {
         const { userId, hospitalId, doctor, department, date, time, symptoms ,gender} = req.body
           if (!userId || !hospitalId || !doctor || !department || !date || !time) {
      return res.status(400).json({ message: "Please fill all required fields" });
  
    }
        const newAppointment = new Appointment({
        userId, hospitalId, doctor, department, date, time, symptoms,gender
      })
      await newAppointment.save()
        return res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
    } catch (error) {
     console.error("Booking Error:", error);
    res.status(500).json({
        message: "Error booking appointment",
        error: error.message
    });
    }
})


router.get('/user/:user_id' , async(req , res) => {
    try {
        const appointments = await Appointment.find({userId : req.params.user_id})
        .populate("hospitalId" ,"name address image")
        .sort({date : 1})
        if(!appointments){
            return res.status(404).json({message : 'Sorry , you have not book an appointment'})
        }
        return res.status(201).json(appointments)
    } catch (error) {
        return res.status(500).json({message: 'Server Error'})
    }
})
// DELETE /api/appointments/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    return res.status(200).json({ message: "Appointment deleted successfully", appointment: deletedAppointment });
  } catch (error) {
    console.error("Delete appointment error:", error);
    return res.status(500).json({ message: "Server error while deleting appointment" });
  }
});
// GET appointments for a hospital
router.get('/hospital/:hospitalId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ hospitalId: req.params.hospitalId })
      .populate('userId', 'name email') // populate user info
      .sort({ date: 1 });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this hospital' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching hospital appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.patch("/:id" , async(req , res) => {
    try {
        const {status } = req.body
        const updated = await Appointment.findOneAndUpdate({_id:req.params.id }, {status } ,{new : true})
        if(!updated) return res.status(404).json({message : 'You have not book an appointment'})
        return res.status(201).json({message : 'Appointment Updated' , appointment: updated})

    } catch (error) {
        return res.status(500).json({message : 'Server Error'})
    }
})


export default router