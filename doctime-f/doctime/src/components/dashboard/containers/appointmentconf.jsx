import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentConfirmation = () => {
  const [appointmentInfo, setAppointmentInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAppointmentInfo = JSON.parse(localStorage.getItem('appointment-info'));
    setAppointmentInfo(savedAppointmentInfo);
  }, []);

  if (!appointmentInfo) {
    return <div className="h-screen">Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-wrap justify-center items-center text-white p-6">
      <div className='h-[450px] w-[500px] bg-custombg rounded-xl flex flex-col justify-center items-center'>
      <h2 className="text-2xl font-bold">Appointment Confirmed!</h2>
      <p className="text-xl mt-4">Hospital/Clinic: {appointmentInfo.name}</p>
      <p className="text-xl mt-2">Doctor: {appointmentInfo.doctor}</p>
      <p className="text-xl mt-2">Specialty: {appointmentInfo.specialty}</p>
      <p className="text-xl mt-2">Appointment Timing: {appointmentInfo.timings}</p>
      <p className="text-xl mt-2">Your Slot Number: {appointmentInfo.slot}</p>
     
     
      <button onClick={() => navigate('/appointments')} className="mt-4 bg-white text-custombg p-2 rounded-lg">
        View Appointments
      </button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;



