import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import loginRoute from './route/loginRoute.js'
import hospitalLogin from './route/hospitalLogin.js'
import locationRoute from './route/loactionRoute.js'
import hospitals from './route/hospitalRoute.js'
import appointmentRoutes from './route/appointmentRoute.js'
import cors from 'cors'
dotenv.config()

const allowedOrigins = [
process.env.FRONTEND_URL  
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

app.use(express.json({ limit: '10mb' }))
app.use('/api/userAuth' , loginRoute)
app.use('/api/hospitalAuth' , hospitalLogin)
app.use('/api/location' , locationRoute)
app.use('/api/hospitals' , hospitals)
app.use("/api/appointments", appointmentRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MONGODB CONNECTED')).catch(err => console.log(err))

app.listen(process.env.PORT || 4000 , () => {
    console.log('Server started on port 4000')
})

