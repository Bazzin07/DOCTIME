import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HospitalClinicList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/hospitals.json"); 
        if (!response.ok) {
          throw new Error("Failed to fetch hospital data");
        }
        const jsonData = await response.json();
        setData(jsonData); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Hospitals Nearby</h2>
        <div className="flex flex-wrap gap-4">
          {data
            .filter((item) => item.type === "Hospital")
            .map((hospital, index) => (
              <Link
                to={`/hospital/${hospital.id}`}
                key={index}
                className="relative flex h-40 bg-custombg rounded-lg w-full sm:w-[48%] lg:w-[48%]"
              >
                <div className="w-1/3 bg-gray-300 rounded-lg">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="w-2/3 pt-8 pl-4 text-white relative cursor-pointer">
                  <h3 className="font-bold text-xl">{hospital.name}</h3>
                  <p className="text-lg">{hospital.address}</p>
                  <p className="text-lg">Ph. No.: {hospital.phone}</p>
                  <div className="absolute bottom-2 right-2 text-lg text-white">
                    {hospital.rating} ★
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl text-white font-bold mb-4">Clinics Nearby</h2>
        <div className="flex flex-wrap gap-4">
          {data
            .filter((item) => item.type === "Clinic")
            .map((clinic, index) => (
              <Link
                to={`/clinic/${clinic.id}`}
                key={index}
                className="relative flex h-40 bg-custombg rounded-lg w-full sm:w-[48%] lg:w-[48%]"
              >
                <div className="w-1/3 bg-gray-300 rounded-lg">
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="w-2/3 pt-8 pl-4 text-white relative">
                  <h3 className="font-bold text-xl">{clinic.name}</h3>
                  <p className="text-lg">{clinic.address}</p>
                  <p className="text-lg">Ph. No.: {clinic.phone}</p>
                  <div className="absolute bottom-2 right-2 text-lg text-white">
                    {clinic.rating} ★
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalClinicList;
