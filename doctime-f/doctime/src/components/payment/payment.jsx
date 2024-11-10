import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Payment = () => {
  const { id, doctorname } = useParams(); 
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [appointmentSlot, setAppointmentSlot] = useState(null);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
  
    fetch("/doctorsdetails.json")
      .then((response) => response.json())
      .then((data) => {
        let selectedDoctor = null;
        let appointmentData = null;
  
        const hospital = data.hospitals[id];
        if (hospital) {
          
          selectedDoctor = hospital.doctors.find(doctor => doctor.name === doctorname);
          appointmentData = { name: hospital.name, doctor: selectedDoctor };
        } else {
          const clinic = data.clinics[id];
          if (clinic) {
           
            if (Array.isArray(clinic.doctors)) {
              selectedDoctor = clinic.doctors.find(doctor => doctor.name === doctorname);
            } else {
              selectedDoctor = clinic.doctor; 
            }
  
          
            if (selectedDoctor) {
              appointmentData = { name: clinic.name, doctor: selectedDoctor };
            } else {
              console.error("Doctor not found in clinic data");
            }
          } else {
            console.error("Clinic not found");
          }
        }
  
        if (appointmentData && selectedDoctor) {
          setAppointmentDetails(appointmentData);
          const currentSlot = localStorage.getItem(`${doctorname}-appointments`) || 0;
          setAppointmentSlot(Number(currentSlot) + 1);
        } else {
          console.error("Appointment data is missing or invalid");
        }
  
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setLoading(false);
      });
  }, [id, doctorname]);

  const handlePayment = () => {
    setIsPaymentDone(true);

   
    localStorage.setItem(`${doctorname}-appointments`, appointmentSlot);

    const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

    
    const savedAppointment = {
      name: appointmentDetails.name,
      doctor: appointmentDetails.doctor.name,
      specialty: appointmentDetails.doctor.specialty,
      charges: appointmentDetails.doctor.charges,
      timings: appointmentDetails.doctor.timings,
      slot: appointmentSlot,
    };

    
    existingAppointments.push(savedAppointment);
    localStorage.setItem('appointment-info', JSON.stringify(savedAppointment));

    
    localStorage.setItem('appointments', JSON.stringify(existingAppointments));

   
    setTimeout(() => {
      navigate(`/appointment/confirmation`);
    }, 1300);
  };

  return (
    <div className="h-screen flex justify-center items-center text-white p-6">
      {loading ? (
        <div className="flex justify-center items-center">
          
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      ) : appointmentDetails ? (
        <div className="h-[450px] w-[500px] bg-custombg rounded-xl flex flex-col justify-center items-center p-6">
          <h2 className="text-2xl font-semibold">Payment for {appointmentDetails.name}</h2>
          <div className="mt-4 text-xl space-y-2">
            <h3>Doctor: {appointmentDetails.doctor.name}</h3>
            <p>Specialty: {appointmentDetails.doctor.specialty}</p>
            <p>Charges: ${appointmentDetails.doctor.charges}</p>
            <p>Timing: {appointmentDetails.doctor.timings}</p>
            <p>Appointment Slot: {appointmentSlot}</p>
          </div>

          {!isPaymentDone ? (
            <button 
              onClick={handlePayment} 
              className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all duration-300"
            >
              Confirm Payment
            </button>
          ) : (
            <p className="mt-6 bg-green-100 text-green-800 px-6 py-2 rounded-lg">
              Payment Successful!
            </p>
          )}
        </div>
      ) : (
        <p>Error loading appointment details.</p>
      )}
    </div>
  );
};

export default Payment;
