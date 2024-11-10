import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [hospitalData, setHospitalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("/hospitals.json")
      .then((response) => response.json())
      .then((data) => {
        setHospitalData(data);
        setResults(data);
        console.log(data);
      });
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredResults = hospitalData.filter(
      (hospital) =>
        hospital.name.toLowerCase().includes(value) ||
        hospital.address.toLowerCase().includes(value) ||
        hospital.type.toLowerCase().includes(value)
    );

    setResults(filteredResults);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4">
      {/* Search Section */}
      <section className="w-full md:w-2/3 relative">
        <div className="flex flex-col w-full md:w-4/5 gap-4">
          <div className="flex items-center bg-custombg p-2 rounded-full shadow-md w-full relative">
            <input
              type="text"
              className="p-2 rounded-full flex-grow outline-none bg-white text-sm md:text-base"
              placeholder="Search....."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="w-16 md:w-20 bg-white p-2 rounded-full ml-2 text-gray-700 font-semibold text-sm md:text-base">
              Filter
            </button>
          </div>

          {/* Search Results */}
          {searchTerm && results.length > 0 && (
            <div className="absolute top-16 w-full flex flex-col gap-2 cursor-pointer bg-white border rounded-2xl shadow-lg z-50 max-h-64 overflow-y-auto">
              {results.map((hospital, index) => (
                <div
                  key={index}
                  className="p-3 md:p-4 border-b last:border-b-0 w-full hover:bg-gray-50"
                >
                  <h2 className="text-base md:text-lg font-semibold">{hospital.name}</h2>
                  <p className="text-sm md:text-base">{hospital.address}</p>
                  <span className="text-xs md:text-sm text-gray-500">{hospital.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Navigation Section */}
      <section className="w-full md:w-1/4 h-12 md:h-16 flex justify-evenly items-center bg-custombg text-white rounded-xl">
        <Link to="/hospitals" className="text-base md:text-xl hover:text-gray-200">
          Hospitals
        </Link>
        <p className="text-base md:text-xl">|</p>
        <Link to="/clinics" className="text-base md:text-xl hover:text-gray-200">
          Clinics
        </Link>
      </section>
    </div>
  );
};

export default HeroSection;