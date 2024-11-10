import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/login/login';
import Records from './components/records/records';
import Dashboard from './components/dashboard/containers/dashboard';
import HospitalDetails from './components/sections/doctordetails';
import HospitalClinicList from './components/dashboard/containers/nearby';
import Hospitals from './components/sections/hospitals';
import Clinics from './components/sections/clincs';
import Payment from './components/payment/payment';
import AppointmentConfirmation from './components/dashboard/containers/appointmentconf';
import AppointmentsPage from './components/dashboard/containers/appointments';
function App() {
  return (
    
    <div className="App ">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/records" element={<Records />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/nearby" element={<HospitalClinicList />} /> {/* Fixed path */}
          <Route path="/hospital/:id" element={<HospitalDetails />} />
          <Route path="/clinic/:id" element={<HospitalDetails />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/payment/hospital/:id/:doctorname" element={<Payment />} />
          <Route path="/payment/clinic/:id/:doctorname" element={<Payment />} />
          <Route path="/appointment/confirmation" element={<AppointmentConfirmation />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
        </Routes>
      </Router>
    </div>
   
  );
}

export default App;
