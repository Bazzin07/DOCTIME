import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const HospitalDetails = () => {
  const { id } = useParams();
  const [hospitalData, setHospitalData] = useState(null);
  const [clinicData, setClinicData] = useState(null);

  useEffect(() => {
    fetch("/doctorsdetails.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.hospitals[id]) {
          setHospitalData(data.hospitals[id]);
        } else if (data.clinics[id]) {
          setClinicData(data.clinics[id]);
        }
      });
  }, [id]);

  if (!hospitalData && !clinicData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  const DoctorCard = ({ doctor, to }) => (
    <Link
      to={to}
      className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] p-4 flex flex-col bg-custombg rounded-lg shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="space-y-2">
        <h3 className="font-bold text-xl md:text-2xl truncate">{doctor.name}</h3>
        <p className="text-sm md:text-base">
          <span className="font-semibold">Specialty:</span> {doctor.specialty}
        </p>
        <p className="text-sm md:text-base">
          <span className="font-semibold">Charges:</span> ${doctor.charges}
        </p>
        <p className="text-sm md:text-base">
          <span className="font-semibold">Timings:</span> {doctor.timings}
        </p>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen text-white p-4 md:p-6">
      {hospitalData ? (
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
            {hospitalData.name}
          </h2>
          
          <h3 className="text-xl md:text-2xl text-center font-semibold mt-6 mb-8">
            Doctors List
          </h3>
          
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
            {hospitalData.doctors.map((doctor, index) => (
              <DoctorCard
                key={index}
                doctor={doctor}
                to={`/payment/hospital/${id}/${doctor.name}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
            {clinicData.name}
          </h2>
          
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Doctor
          </h3>
          
          <div className="max-w-md">
            <DoctorCard
              doctor={clinicData.doctor}
              to={`/payment/clinic/${id}/${clinicData.doctor.name}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalDetails;
