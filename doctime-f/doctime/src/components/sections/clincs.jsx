
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Clinics = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/hospitals.json");
        if (!response.ok) {
          throw new Error("Failed to fetch clinic data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="animate-pulse text-xl">Loading clinics...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen text-white p-4 md:p-6 overflow-auto'>
      <h1 className='text-3xl md:text-4xl lg:text-5xl text-center font-semibold mb-6 md:mb-8'>
        Clinics
      </h1>

      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {data
            .filter((item) => item.type === "Clinic")
            .map((clinic, index) => (
              <Link
                to={`/hospital/${clinic.id}`}
                key={index}
                className="group flex flex-col sm:flex-row bg-custombg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
              
                <div className="w-full sm:w-1/3 h-48 sm:h-auto bg-gray-300">
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/placeholder-clinic.jpg'; // Fallback image
                      e.target.alt = 'Clinic placeholder';
                    }}
                  />
                </div>

                {/* Content Container */}
                <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between relative">
                  <div>
                    <h2 className="font-bold text-lg md:text-xl mb-2 group-hover:text-gray-200 transition-colors">
                      {clinic.name}
                    </h2>
                    <p className="text-sm md:text-base mb-2 text-gray-100">
                      {clinic.address}
                    </p>
                    <p className="text-sm md:text-base text-gray-100">
                      Ph. No.: {clinic.phone}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 sm:bottom-4 sm:top-auto bg-black/30 px-3 py-1 rounded-full text-sm md:text-base flex items-center gap-1">
                    <span>{clinic.rating}</span>
                    <span className="text-white">★</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Clinics;