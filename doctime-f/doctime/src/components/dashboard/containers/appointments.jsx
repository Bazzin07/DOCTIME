import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

    const validAppointments = savedAppointments.filter(appointment =>
      appointment.name &&
      appointment.doctor &&
      appointment.specialty &&
      appointment.timings &&
      appointment.slot
    );

    setAppointments(validAppointments);
  }, []);

  const handleDelete = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  return (
    <div className="min-h-screen p-4 md:p-8 w-full">
      <Navbar />
      <h2 className="text-white text-xl md:text-2xl text-center mt-4 md:mt-6 mb-4 md:mb-6">
        Scheduled Appointments
      </h2>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div
                key={index}
                className="p-4 bg-custombg rounded-lg shadow-md text-white flex justify-between items-start w-full"
              >
                <div className="flex-1 space-y-2">
                  <p className="text-base md:text-lg break-words">
                    <span className="font-medium">Hospital/Clinic:</span> {appointment.name}
                  </p>
                  <p className="text-base md:text-lg break-words">
                    <span className="font-medium">Doctor:</span> {appointment.doctor}
                  </p>
                  <p className="text-base md:text-lg break-words">
                    <span className="font-medium">Specialty:</span> {appointment.specialty}
                  </p>
                  <p className="text-base md:text-lg">
                    <span className="font-medium">Timing:</span> {appointment.timings}
                  </p>
                  <p className="text-base md:text-lg">
                    <span className="font-medium">Slot Number:</span> {appointment.slot}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="ml-2 p-2 hover:bg-red-600/20 rounded-full transition-colors"
                  title="Delete Appointment"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 hover:text-red-700 text-lg md:text-xl"
                  />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-white text-lg">No appointments scheduled.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;