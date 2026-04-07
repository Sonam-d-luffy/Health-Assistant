import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Disease from "./pages/Disease";
import Login from "./pages/Login";
import Health from "./pages/Health";
import Hospitals from "./pages/Hospitals";
import Location from "./pages/Location";
import HospitalLogin from "./pages/HospitalLogin";
import AddHospital from "./pages/AddHospital";
import UserHospitals from "./pages/UserHospitals";
import HospitalDetails from "./pages/HospitalDetails";
import Appointment from "./pages/Appointment";
import Treatment from "./pages/Treatment";
import YourAppointments from "./pages/YourAppointments";
import HospitalAppointments from "./pages/HospitalAppointments";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/disease' element={<Disease />} />
        <Route path='/login' element={<Login />} />
        <Route path='/health' element={<Health />} />
        <Route path='/treatment' element={<Treatment />} />
        <Route path='/hospitals' element={<Hospitals />} />
        <Route path="/addressPage" element={<Location/>}/>
        <Route path="/hospitalLogin" element={<HospitalLogin/>}/>
        <Route path="/addHospitals" element={<AddHospital/>}/>
        <Route path="/yourHospitals" element={<UserHospitals/>}/>
        <Route path='/hospitalDetails/:id' element={<HospitalDetails/>}/>
        <Route path='/appointmentPage/:hospitalId' element={<Appointment/>}/>
        <Route path='/yourAppointment' element={<YourAppointments/>}/>
        <Route path='/hospitalAppointments' element={<HospitalAppointments/>}/>
      </Routes>
    </Router>
  );
}

export default App;
